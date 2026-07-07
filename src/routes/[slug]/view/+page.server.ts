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

    if(thingDB.name.endsWith(".txt")) {
        const file = await getFile(thingID);
        if(!file) return error(404, "File doesn't exists");

        const fileText = file.toString("utf-8");

        return {fileText, fileName: thingDB.name, type: "text", id: thingDB.id}
    } else if(thingDB.name.endsWith(".png") || thingDB.name.endsWith(".jpg") || thingDB.name.endsWith(".jpeg") || thingDB.name.endsWith(".webp") || thingDB.name.endsWith(".gif")) {
        return {id: thingID, type: "image", fileName: thingDB.name}
    } else if(thingDB.name.endsWith(".mp4") || thingDB.name.endsWith(".mov") || thingDB.name.endsWith(".mkv")) {
        return {id: thingID, type: "video", fileName: thingDB.name}
    } else {
        return error(400, "File type not supported")
    }
}