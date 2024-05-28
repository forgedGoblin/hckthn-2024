import { register_schema, users } from "@/schemas/user";
import { db } from "../../sqlite-service";
import { eq, and, or } from "drizzle-orm";
import type {
    LoginResponse,
    RegisterResponse,
} from "~/controllers/auth.sqlite";

export default defineEventHandler(async (event) => {
    const body = await readValidatedBody(event, (body) =>
        register_schema.validate(body)
    );

    try {
        // Find first a user with existing email/username

        const result = await db
            .select()
            .from(users)
            .where(
                or(
                    eq(users.username, body.username),
                    eq(users.email, body.email)
                )
            );

        if (result.length) {
            // Find first if it is an email match or username
            const emailmatch = result.some(
                (match) => match.email === body.email
            );
            const usernamematch = result.some(
                (match) => match.username === body.username
            );

            return <RegisterResponse>{
                error: `${emailmatch ? "Email" : "Username"} is already registered`,
            };
        }

        // If not then proceed on registration
        const user = await db
            .insert(users)
            .values({
                email: body.email,
                username: body.username,
                password: body.password,
            })
            .returning();

        return user[0];
    } catch (e: any) {
        throw createError({
            statusCode: 400,
            statusMessage: e.message,
        });
    }
});
