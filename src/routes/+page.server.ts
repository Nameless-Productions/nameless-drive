import { fail, redirect } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";
import bcrypt from "bcrypt"
import { db } from "$lib/db";

export const load: PageServerLoad = async () => {
    const thingsInRoot = await db.storage.findMany({
        where: {
            parentId: null
        }
    })

    return {stuff: thingsInRoot}
}

export const actions: Actions = {
    account: async ({request}) => {
        const data = await request.formData()

        const username = data.get("username")?.toString()
        const password = data.get("password")?.toString()
        if(!username || !password) return fail(400, {error: "All fields are required"});
        const users = await db.user.findMany()
        if (users.length !== 0) return fail(403, {error: "User already exists"})

        const passwordHash = await bcrypt.hash(password, 10)

        await db.user.create({
            data: {
                username,
                password: passwordHash
            }
        })

        return redirect(301, new URL("/", request.url))
    },

    folder: async ({request}) => {
        const formData = await request.formData()
        const folderName = formData.get("name")?.toString()
        if(!folderName) return fail(400, {error: "Folder name required"})

        const newFolder = await db.storage.create({
            data: {
                isFolder: true,
                name: folderName
            }
        })

        return redirect(301, new URL(`/${newFolder.id}`, request.url))
    }
}