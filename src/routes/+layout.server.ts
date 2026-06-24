import { db } from "$lib/db";
import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async () => {
    let isSetup = true
    const users = await db.user.findMany();

    if (users.length === 0) isSetup = false;
    

    return {isSetup}
}