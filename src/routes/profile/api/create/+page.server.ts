import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { createApiKey } from '$lib/apiUtils';

export const load: PageServerLoad = async ({ locals }) => {
	const uid = locals.user?.id;
	if (!uid) return error(401, 'Unauthorized');

	const newApiKey = await createApiKey(uid);
	if (!newApiKey) return error(400, "User doesn't exists or error on our side");

	return { newApiKey };
};
