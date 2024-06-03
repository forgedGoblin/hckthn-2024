<script lang="ts" setup>
import * as yup from 'yup'
import { definePageMeta } from "../.nuxt/typed-router/__definePageMeta";
import { set } from "@vueuse/core";

definePageMeta({
    // middleware: ["auth"],
});

const router = useRouter();

const { logout: _logout } = useUserSession();

const isloggingout = ref(false);
const logout = () => {
    _logout();
    set(isloggingout, true);
    router.push("/");
};

const schema = yup.object({
    email: yup.string().required('Email is required').email("Invalid Format"),
    password: yup.string().required("Password is required").min(8, "Minimum length of 8")
})
</script>

<template>
    <Screen>
        <Fill center>
            <DynamicForm :schema="schema" @submit="(v) => console.log(`Success`)" />
        </Fill>
    </Screen>
</template>

<style lang="scss" scoped></style>
