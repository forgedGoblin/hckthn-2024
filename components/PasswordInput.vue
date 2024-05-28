<script setup lang="ts">
import { set } from "@vueuse/core";
import FloatLabel from "primevue/floatlabel";

const modelValue = defineModel<string>();

const {
    label,
    hint,
    name: _name,
    disabled: _disabled,
} = defineProps<{
    label?: string;
    hint?: string;
    feedback?: boolean;
    disabled?: boolean;
    name?: string;
    size?: "large" | "small";
}>();

const provided_name = inject<string>("form-name");
const name = computed(() => provided_name || _name);

const provided_loading = inject<globalThis.Ref<boolean>>("form-loading");
const provided_disabled = inject<ComputedRef<boolean>>("form-disabled");
const disabled = computed(
    () => provided_disabled?.value || provided_loading?.value || _disabled
);

const componentid = ref("");
onMounted(() => set(componentid, genid()));
</script>

<template>
    <div class="flex flex-col">
        <PrimePassword
            v-model="modelValue"
            :name="name"
            :size="size"
            :id="componentid + 'input'"
            :aria-describedby="componentid + 'hint'"
            :disabled="disabled"
            :placeholder="label"
            toggle-mask
            :feedback="feedback"
        />
        <small
            v-if="!!hint"
            :id="componentid + 'hint'"
            >{{ hint }}</small
        >
    </div>
</template>

<style lang="scss" scoped></style>
