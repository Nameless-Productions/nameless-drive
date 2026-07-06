import { db } from "$lib/db";
import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({params}) => {
    const folderID = params.slug;

    const folderDB = await db.storage.findUnique({
        where: {
            isFolder: true,
            id: Number(folderID)
        }
    })

    if(!folderDB) throw error(404, "Folder not found");

    const folderChildren = await db.storage.findMany({
        where: {
            parentId: folderDB.id
        }
    })

    return {name: folderDB.name, folderChildren}
}