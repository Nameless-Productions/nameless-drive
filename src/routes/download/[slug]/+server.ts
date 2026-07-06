import { db } from "$lib/db";
import type { RequestHandler } from "./$types";
import { getFile } from "$lib/getFile";

export const GET: RequestHandler = async ({params}) => {
    const fileDB = await db.storage.findUnique({
        where: {
            id: Number(params.slug)
        }
    })
    if(!fileDB || fileDB.isFolder) return new Response("Not found or is folder", {status: 404});

    const file = await getFile(fileDB.id)

    return new Response(file, {
        headers: {
            "Content-Type": "application/octet-stream",
            "Content-Disposition": `attachment; filename="${fileDB.name}"`
        }
    })
}