import { fail, redirect } from "@sveltejs/kit";
import type { Actions } from "./$types";
import bcrypt from "bcrypt"
import { db } from "$lib/db";

export const actions: Actions = {
    account: async ({request}) => {
        const data = await request.formData()

        const username = data.get("username")?.toString()
        const password = data.get("password")?.toString()
        if(!username || !password) return fail(400, {error: "All fields are required"})

        const passwordHash = await bcrypt.hash(password, 10)

        await db.user.create({
            data: {
                username,
                password: passwordHash
            }
        })

        return redirect(301, new URL("/", request.url))
    }
}