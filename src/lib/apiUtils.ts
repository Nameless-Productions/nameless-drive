import jwt from 'jsonwebtoken';
import { db } from './db';

export async function verifyApiKey(key: string) {
	const decodedJwt = jwt.decode(key) as { uid?: number };
	if (!decodedJwt.uid || isNaN(decodedJwt.uid)) return false;

	const userDB = await db.user.findUnique({
		where: {
			id: decodedJwt.uid
		}
	});
	if (!userDB) return false;

	try {
		const verifyKey = jwt.verify(key, userDB.apiSecret) as { uid: number };
		return verifyKey.uid;
	} catch {
		return false;
	}
}

export async function createApiKey(uid: number) {
	const usr = await db.user.findUnique({
		where: {
			id: uid
		}
	});
	if (!usr) return;

	return jwt.sign({ uid }, usr.apiSecret);
}

export async function updateUserSecret(uid: number) {
	const user = await db.user.findUnique({
		where: {
			id: uid
		}
	});
	if (!user) return;

	await db.user.update({
		where: user,
		data: {
			apiSecret: crypto.randomUUID()
		}
	});
}
