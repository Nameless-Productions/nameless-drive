import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { getFile } from '$lib/getFile';

export const GET: RequestHandler = async ({ params }) => {
	const fileId = Number(params.slug);

	if (isNaN(fileId)) return json({ error: 'File ID is not a number' }, { status: 400 });

	const file = await getFile(fileId);
	if (!file) return json({ error: "File doesn't exists or is folder" }, { status: 404 });

	return new Response(file);
};
