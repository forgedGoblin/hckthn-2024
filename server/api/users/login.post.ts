import { login_schema, users } from "@/schemas/user";
import { db } from "../../sqlite-service";
import { eq, and } from "drizzle-orm";
import type { LoginResponse } from "~/controllers/auth.sqlite";

export default defineEventHandler(async (event) => {
    const body = await readValidatedBody(event, (body) =>
        login_schema.validate(body)
    );

    try {
        const _users = await db
            .select()
            .from(users)
            .where(eq(users.username, body.username));

        if (_users.length === 0) {
            return <LoginResponse>{
                error: `User: ${body.username} does not exist`,
            };
        }

        const [user] = _users;

        if (user.password !== body.password) {
            return <LoginResponse>{
                error: "Incorrect password",
            };
        }

        return user;
    } catch (e: any) {
        throw createError({
            statusCode: 400,
            statusMessage: e.message,
        });
    }
});
