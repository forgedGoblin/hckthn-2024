import { users } from "@/schemas/user";
import { db } from "../sqlite-service";

export default defineEventHandler(async (event) => {
    try {
        const _users = await db.select().from(users).all();
        return { users: _users };
    } catch (e: any) {
        throw createError({
            statusCode: 400,
            statusMessage: e.message,
        });
    }
});
