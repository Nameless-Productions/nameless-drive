import path from "path"
import fs from "fs/promises"
import { db } from "./db";

export async function uploadFile(name: string, file: File, parent?: number) {
    const fileBuffer = Buffer.from(await file.arrayBuffer())

    const fileDB = await db.storage.create({
        data: {
            name,
            parentId: parent,
            isFolder: false
        }
    })
    const storedName = fileDB.dbName;

    const filePath = path.join(process.cwd(), "files", storedName!);
    await fs.mkdir(filePath, {recursive: true});
    await fs.writeFile(filePath, fileBuffer)
}