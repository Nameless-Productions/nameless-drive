import path from "path"
import fs from "fs/promises"
import { db } from "./db";

export async function uploadFile(file: File, parent?: number) {
    const fileBuffer = Buffer.from(await file.arrayBuffer())
    const fileDB = await db.storage.create({
        data: {
            name: file.name,
            parentId: parent,
            isFolder: false
        }
    })
    const storedName = fileDB.dbName;
    const filesPath = path.join(process.cwd(), "files")
    const filePath = path.join(filesPath, storedName!);

    await fs.mkdir(filesPath, {recursive: true});
    await fs.writeFile(filePath, fileBuffer)
}