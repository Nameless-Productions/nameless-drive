import { db } from "$lib/db";
import { error, fail, redirect } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";
import { uploadFile } from "$lib/uploadFile";

export const load: PageServerLoad = async ({params}) => {
    const thingID = params.slug;

    const thingDB = await db.storage.findUnique({
        where: {
            id: Number(thingID)
        }
    })

    if(!thingDB) throw error(404, "Folder not found");

    if(thingDB.isFolder) {
        const folderChildren = await db.storage.findMany({
            where: {
                parentId: thingDB.id
            }
        })

        return {name: thingDB.name, folderChildren, parent: thingDB.parentId}
    }

    throw error(404, "Not a folder")

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
                parentId: Number(parent),
                dbName: null
            }
        })

        return redirect(301, new URL(`/${newFolder.id}`, request.url))
    },

    file: async ({request, params}) => {
        const formData = await request.formData()
        const file = formData.getAll("file") as File[] | null;
        if(!file) return fail(400, {error: "File required"});
        file.forEach(async (f) => {
            await uploadFile(f, Number(params.slug));
        })
    }
}