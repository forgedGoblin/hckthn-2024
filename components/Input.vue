<script setup lang="ts">
import { set } from "@vueuse/core";
import IconField from "primevue/iconfield";
import FloatLabel from "primevue/floatlabel";
import InputIcon from "primevue/inputicon";
const modelValue = defineModel<string>();

const {
    label,
    hint,
    name: _name,
    disabled: _disabled,
    loading: _loading,
} = defineProps<{
    label?: string;
    hint?: string;
    disabled?: boolean;
    icon?: string;
    name?: string;
    size?: "large" | "small";
    loading?: boolean;
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
        <template v-if="!!icon">
            <IconField icon-position="left">
                <InputIcon :class="icon" />
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
        </template>
        <template v-else>
            <FloatLabel>
                <PrimeInputText
                    v-model="modelValue"
                    :size="size"
                    :name="name"
                    :id="componentid + 'input'"
                    :aria-describedby="componentid + 'hint'"
                    :disabled="disabled"
                    :placeholder="label"
                />
                <label
                    v-if="label"
                    :for="componentid + 'input'"
                    >{{ label }}</label
                >
            </FloatLabel>
        </template>

        <small
            v-if="!!hint"
            :id="componentid + 'hint'"
            >{{ hint }}</small
        >
    </div>
</template>

<style lang="scss" scoped></style>
