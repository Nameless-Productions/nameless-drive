import { verifyApiKey } from "$lib/apiUtils";
import { db } from "$lib/db";
import { verifyToken } from "$lib/jwt";
import { limiter } from "$lib/rateLimiter";
import { error, json, redirect, type Handle } from "@sveltejs/kit";

export const handle: Handle = async ({event, resolve}) => {
    const path = event.url.pathname;

    if(await limiter.isLimited(event)) {
        return error(429, "Rate limited")
    }

    if(path.startsWith("/login")) return await resolve(event);
    const users = await db.user.findMany({})
    if (users.length === 0) return await resolve(event);

    if(path.startsWith("/api")) {
        const headers = event.request.headers;
        const apiKey = headers.get("X-API-key")
        if(!apiKey) return json({error: "No api key provided"}, {status: 401});

        const verifyKey = await verifyApiKey(apiKey);
        if(!verifyKey) return json({error: "Invalid API key"}, {status: 401});

        return await resolve(event);
    }

    const token = event.cookies.get("token")
    if(!token) return redirect(302, new URL("/login", event.url));
    const usr = verifyToken(token)
    if(!usr) return redirect(302, new URL("/login", event.url));

    const usrDB = await db.user.findUnique({
        where: {
            id: usr.uid,
            username: usr.username
        }
    })

    if(!usrDB) return redirect(302, new URL("/login", event.url));

    event.locals.user = {id: usrDB.id, username: usrDB.username};

    const res = await resolve(event);
    return res;
}