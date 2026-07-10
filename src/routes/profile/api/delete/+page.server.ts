import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { updateUserSecret } from "$lib/apiUtils";

export const load: PageServerLoad = async ({locals}) => {
    const uid = locals.user?.id;
    if(!uid) return error(401, "Unauthorized");

    await updateUserSecret(uid);
}