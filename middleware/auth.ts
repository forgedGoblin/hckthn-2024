import { useUserSession } from "../composables/UserSession";

export default defineNuxtRouteMiddleware((to, from) => {
    const { isloggedin } = useUserSession();

    if (!isloggedin.value) return navigateTo("/login");
});
