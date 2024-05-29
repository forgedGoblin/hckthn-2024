import type { User } from "~/schemas/user";

//#region Login

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
    throw new Error(`Not implemented yet`);
};

//#region Register

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
    throw new Error(`Not implemented yet`);
};
