import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import { db } from "$lib/db";

export const GET: RequestHandler = async ({params}) => {
    const parent = params.slug;

    if(isNaN(Number(parent))) return json({error: "Parent is not a number"}, {status: 400});

    const storateDB = await db.storage.findMany({
        where: {
            parentId: Number(parent)
        },
        select: {
            dbName: false,
            id: true,
            name: true,
            parentId: true,
            isFolder: true
        }
    });

    return json({things: storateDB})
}