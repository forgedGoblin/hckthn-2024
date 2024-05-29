<script lang="ts" setup>
import QrcodeVue from "qrcode.vue";
import { get } from "@vueuse/core";

const model = defineModel<string>();

// Props
const { width = 500 } = defineProps<{
    width?: number;
}>();

// Fallback to whatever the current link is
const loc = useBrowserLocation();
const link = computed(() => get(model) || get(loc).origin || "");
</script>

<template>
    <qrcode-vue
        :value="link"
        :size="width"
        level="H"
        :margin="1"
        class="rounded"
    />
</template>

<style lang="scss" scoped></style>
