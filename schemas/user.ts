import { sql, type InferInsertModel, type InferSelectModel } from "drizzle-orm";
import { sqliteTable, integer, text } from "drizzle-orm/sqlite-core";
import * as yup from "yup";

export const users = sqliteTable("users", {
    id: integer("id").primaryKey(),
    email: text("email"),
    username: text("username"),
    password: text("password"),
    createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`),
});

export type User = InferSelectModel<typeof users>;
export type InsertUser = InferInsertModel<typeof users>;

export const login_schema = yup.object({
    username: yup.string().required("Username is required"),
    password: yup
        .string()
        .required("Password is required")
        .min(4, "Password minimum of 4 characters"),
});

export const register_schema = yup.object({
    username: yup.string().required("Username is required"),
    password: yup
        .string()
        .required("Password is required")
        .min(4, "Password minimum of 4 characters"),
    email: yup
        .string()
        .required("Email is required")
        .email("Not a valid email"),
    confirmpassword: yup
        .string()
        .oneOf([yup.ref("password"), ""], "Passwords must match"),
});
