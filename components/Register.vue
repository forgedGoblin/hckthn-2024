<script setup lang="ts" generic="T extends RoutesNamesList, P extends string">
import type { RoutesNamesList, NuxtRoute } from "@typed-router";
import { useToast } from "primevue/usetoast";
import { type RegisterHandler, register } from "@/controllers/auth.sqlite";
import { register_schema as schema } from "@/schemas/user";

const { handler = register } = defineProps<{
    login?: NuxtRoute<T, P>;
    handler?: RegisterHandler;
}>();

const state = reactive({
    username: "",
    email: "",
    password: "",
    confirmpassword: "",
});

// Emits
const emits = defineEmits<{
    (event: "success"): void;
    (event: "failed"): void;
}>();

const toast = useToast();
const onError = (error: string) => {
    toast.add({
        severity: "error",
        summary: "Register Error",
        detail: error,
        life: 3000,
    });
    emits("failed");
};
const onSuccess = () => {
    toast.add({
        severity: "success",
        summary: "Register Success",
        life: 3000,
    });
    emits("success");
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
        else onSuccess();

        return result;
    },
    null,
    {
        immediate: false,
    }
);
</script>

<template>
    <PrimePanel
        header="Register"
        class="dmsans bg-opacity-70 bg-stone-900 max-w-fit"
    >
        <Form
            :schema="schema"
            :state="state"
            @submit="submit"
            class="flex flex-col gap-1"
            v-slot="{ errors, reset }"
        >
            <Field name="email">
                <Input
                    label="Email"
                    icon="pi pi-envelope"
                    v-model="state.email"
                />
            </Field>

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
                    v-model="state.password"
                />
            </Field>

            <Field name="confirmpassword">
                <PasswordInput
                    label="Confirm Password"
                    v-model="state.confirmpassword"
                />
            </Field>

            <PrimeButton
                class="mt-2"
                label="Login"
                color="green"
                severity="success"
                type="submit"
                :loading="isLoading"
            />
            <Anchor
                v-if="!!login"
                :to="login"
                class="ml-auto"
            >
                or login here
            </Anchor>
        </Form>
    </PrimePanel>
</template>

<style lang="scss" scoped></style>
