import type { Config } from "drizzle-kit";

export default {
    schema: "./schemas/**/*",
    out: "./drizzle",
    dialect: "sqlite",
    dbCredentials: {
        url: "./sqlite.db",
    },
} satisfies Config;
