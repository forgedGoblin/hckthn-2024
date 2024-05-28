<script lang="ts" setup>
import { definePageMeta } from "../.nuxt/typed-router/__definePageMeta";
import { set } from "@vueuse/core";

definePageMeta({
    middleware: ["auth"],
});

const router = useRouter();

const { logout: _logout } = useUserSession();

const isloggingout = ref(false);
const logout = () => {
    _logout();
    set(isloggingout, true);
    router.push("/");
};
</script>

<template>
    <Screen>
        <Fill center>
            <PrimePanel header="Home">
                <PrimeButton
                    @click="logout"
                    :loading="isloggingout"
                    label="Logout"
                    severity="danger"
                />
            </PrimePanel>
        </Fill>
    </Screen>
</template>

<style lang="scss" scoped></style>
