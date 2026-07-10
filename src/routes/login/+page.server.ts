import { db } from '$lib/db';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import bcrypt from 'bcrypt';
import { createToken } from '$lib/jwt';

export const actions: Actions = {
	login: async ({ cookies, request }) => {
		const formData = await request.formData();
		const username = formData.get('username')?.toString();
		const password = formData.get('password')?.toString();
		if (!username || !password) return fail(400, { error: 'Username and password is required' });

		const userDB = await db.user.findUnique({
			where: {
				username
			}
		});

		if (!userDB) return fail(400, { error: 'Invalid credentials' });

		if (!(await bcrypt.compare(password, userDB.password)))
			return fail(400, { error: 'Invalid credentials' });

		const jwtToken = createToken({ uid: userDB.id, username });

		cookies.set('token', jwtToken, {
			path: '/',
			maxAge: 60 * 60 * 24 * 30,
			httpOnly: true,
			sameSite: 'lax'
		});

		return redirect(302, new URL('/', request.url));
	}
};
