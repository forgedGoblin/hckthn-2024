import type { User } from "~/schemas/user";

export type LoginResponse =
    | {
          error: string;
      }
    | User;

export type LoginParams = {
    username: string;
    password: string;
};

export type LoginHandler = (param: LoginParams) => Promise<LoginResponse>;

export const login: LoginHandler = async ({ password, username }) => {
    const result = await $fetch("/api/users/login", {
        method: "POST",
        body: { password, username },
    });

    return result;
};

export type RegisterResponse =
    | {
          error: string;
      }
    | User;

export type RegisterParams = {
    username: string;
    password: string;
    email: string;
};

export type RegisterHandler = (
    param: RegisterParams
) => Promise<RegisterResponse>;

export const register: RegisterHandler = async ({
    email,
    password,
    username,
}) => {
    const result = await $fetch("/api/users/register", {
        method: "POST",
        body: {
            email,
            password,
            username,
        },
    });

    return result;
};
