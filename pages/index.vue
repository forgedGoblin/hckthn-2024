<script lang="ts" setup>
import { useRoute } from "../.nuxt/typed-router/__useTypedRoute";
import { definePageMeta } from "../.nuxt/typed-router/__definePageMeta";

definePageMeta({
    middleware: ["logged-in"],
});

const route = useRoute();
const ischilderoute = computed(() => route.fullPath !== "/");
</script>

<template>
    <Fill
        class="bg-stone-900 dmsans"
        center
    >
        <template v-if="!ischilderoute">
            <PrimePanel>
                <div class="flex flex-col gap-2">
                    <Anchor to="/login">Login</Anchor>
                    <Anchor to="/register">Register</Anchor>
                </div>
            </PrimePanel>
        </template>
        <NuxtPage />
    </Fill>
</template>

<style lang="scss" scoped></style>
