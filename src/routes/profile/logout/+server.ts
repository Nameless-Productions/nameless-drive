import { redirect } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

export const GET: RequestHandler = async ({cookies, request}) => {
    cookies.delete("token", {path: "/"});
    return redirect(301, new URL("/login", request.url))
}