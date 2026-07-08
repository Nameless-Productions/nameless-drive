import { db } from "$lib/db";
import { verifyToken } from "$lib/jwt";
import { redirect, type Handle } from "@sveltejs/kit";

export const handle: Handle = async ({event, resolve}) => {
    const path = event.url.pathname;

    if(path.startsWith("/login")) return await resolve(event);
    const users = await db.user.findMany({})
    if (users.length === 0) return await resolve(event)

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