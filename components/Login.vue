<script lang="ts" setup generic="T extends RoutesNamesList, P extends string">
import type { NuxtRoute } from "@typed-router/__router";
import type { RoutesNamesList } from "@typed-router/__routes";
import {
    type LoginHandler,
    type LoginParams,
    login,
} from "../controllers/auth.sqlite";
import { login_schema as schema, type User } from "@/schemas/user";
import { useToast } from "primevue/usetoast";

const { redirect = "/", handler = login } = defineProps<{
    register?: NuxtRoute<T, P>;
    redirect?: NuxtRoute<T, P>;
    handler?: LoginHandler;
}>();

const state = reactive({
    username: "",
    password: "",
});

const { login: loginsession } = useUserSession();

// Emits
const emits = defineEmits<{
    (event: "success", args: LoginParams): void;
    (event: "failed"): void;
}>();

// Toast
const toast = useToast();
const onError = (error: string) => {
    toast.add({
        severity: "error",
        summary: "Login Error",
        detail: error,
        life: 3000,
    });
    emits("failed");
};
const onSuccess = (u: User) => {
    toast.add({
        severity: "success",
        summary: "Login Success",
        life: 3000,
    });
    emits("success", {
        password: state.password,
        username: state.username,
    });
    loginsession(u);
};

const {
    isLoading,
    isReady,
    error,
    execute: submit,
    state: loginresponse,
} = useAsyncState(
    async () => {
        const result = await handler(state);

        if ("error" in result) onError(result.error);
        else onSuccess(result);

        return result;
    },
    null,
    {
        immediate: false,
    }
);

// Provide Loading States for Inputs
provide("form-loading", isLoading);
</script>

<template>
    <PrimePanel
        header="Login"
        class="dmsans bg-opacity-70 bg-stone-900 max-w-fit"
    >
        <Form
            :schema="schema"
            :state="state"
            @submit="submit"
            class="flex flex-col gap-1"
            v-slot="{ errors, reset }"
        >
            <Field name="username">
                <Input
                    label="Username"
                    icon="pi pi-user"
                    v-model="state.username"
                />
            </Field>

            <Field name="password">
                <PasswordInput
                    label="Password"
                    name="password"
                    v-model="state.password"
                />
            </Field>
            <PrimeButton
                label="Login"
                color="green"
                severity="success"
                type="submit"
                :loading="isLoading"
            />
            <Anchor
                v-if="!!register"
                :to="register"
                class="ml-auto"
            >
                or register here
            </Anchor>
        </Form>
    </PrimePanel>
</template>

<style lang="scss" scoped></style>
