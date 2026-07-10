import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import { db } from "$lib/db";

export const GET: RequestHandler = async () => {
    const storateDB = await db.storage.findMany({
        where: {
            parentId: null
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