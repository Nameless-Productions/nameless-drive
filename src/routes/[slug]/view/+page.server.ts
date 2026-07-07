import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { db } from "$lib/db";
import { getFile } from "$lib/getFile";

export const load: PageServerLoad = async ({params}) => {
    const thingID = Number(params.slug);
    if(isNaN(thingID)) return error(400, "ID is not a number");

    const thingDB = await db.storage.findUnique({
        where: {
            id: thingID
        }
    });
    
    if(!thingDB || thingDB.isFolder) return error(404, "File not found or is a folder");
    if(!thingDB.name.endsWith(".txt")) return error(400, "Not a txt file")

    const file = await getFile(thingID);
    if(!file) return error(404, "File doesn't exists");

    const fileText = file.toString("utf-8");

    return {fileText, fileName: thingDB.name}
}