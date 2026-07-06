import { db } from "$lib/db";
import fs from "fs/promises"
import { error, redirect } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import path from "path";

export const GET: RequestHandler = async ({params, request}) => {
    const thingDB = await db.storage.findUnique({
        where: {
            id: Number(params.slug)
        }
    })

    if(!thingDB) return error(404, "Not found");

    if(thingDB.isFolder) {
        await db.storage.delete({
            where: {
                id: Number(params.slug)
            }
        });
        return redirect(301, new URL(thingDB.parentId ? `/${thingDB.parentId}` : "/", request.url));
    }


    const filePath = path.join(process.cwd(), "files", thingDB.dbName!);
    await fs.rm(filePath, {recursive: true});
    await db.storage.delete({
        where: {
            id: Number(params.slug)
        }
    });
    return redirect(301, new URL(thingDB.parentId ? `/${thingDB.parentId}` : "/", request.url));
}