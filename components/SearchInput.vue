<script setup lang="ts">
import { set } from "@vueuse/core";
import IconField from "primevue/iconfield";
import InputIcon from "primevue/inputicon";
const modelValue = defineModel<string>();

const { label = "Search...", hint } = defineProps<{
    label?: string;
    hint?: string;
    disabled?: boolean;
    name?: string;
    size?: "large" | "small";
}>();

const componentid = ref("");
onMounted(() => set(componentid, genid()));
</script>

<template>
    <div class="flex flex-col">
        <IconField icon-position="left">
            <InputIcon class="pi pi-search" />
            <PrimeInputText
                v-model="modelValue"
                :name="name"
                :size="size"
                :id="componentid + 'input'"
                :aria-describedby="componentid + 'hint'"
                :disabled="disabled"
                :placeholder="label"
            />
        </IconField>
        <small
            v-if="!!hint"
            :id="componentid + 'hint'"
            >{{ hint }}</small
        >
    </div>
</template>

<style lang="scss" scoped></style>
