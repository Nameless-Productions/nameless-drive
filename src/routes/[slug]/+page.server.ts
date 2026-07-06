import { db } from "$lib/db";
import { error, fail, redirect } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";

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

    return {name: folderDB.name, folderChildren, parent: folderDB.parentId}
}

export const actions: Actions = {
    folder: async ({request, params}) => {
        const formData = await request.formData()
        const folderName = formData.get("name")?.toString();
        if(!folderName) return fail(400, {error: "Folder name is required"});
        const parent = params.slug;

        const newFolder = await db.storage.create({
            data: {
                isFolder: true,
                name: folderName,
                parentId: Number(parent)
            }
        })

        return redirect(301, new URL(`/${newFolder.id}`, request.url))
    }
}