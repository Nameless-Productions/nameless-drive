import path from 'path';
import fs from 'fs/promises';
import { db } from './db';

export async function getFile(id: number) {
	const fileDB = await db.storage.findUnique({
		where: {
			id
		}
	});
	if (!fileDB || fileDB?.isFolder || !fileDB.dbName) return;

	const filePath = path.join(process.cwd(), 'files', fileDB.dbName);
	const file = await fs.readFile(filePath);
	return file;
}
