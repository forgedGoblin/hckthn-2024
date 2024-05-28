import type { User } from "~/schemas/user";

export const useUserSession = () => {
    const state = useCookie<Partial<User>>("session-user");

    const isloggedin = computed(() => !!state.value?.id);

    const login = (user: User) => {
        state.value = user;
    };

    const logout = () => {
        state.value = {
            id: 0,
        };
    };

    return {
        state,
        isloggedin,
        login,
        logout,
    };
};
