<script lang="ts" setup>
defineOptions({
    inheritAttrs: false,
});

const slots = defineSlots<{
    default(): any;
    loader(): any;
}>();

const {
    finished = false,
    text = "Loading",
    noCenter = false,
} = defineProps<{
    finished?: boolean;
    text?: string;
    noCenter?: boolean;
}>();
</script>

<template>
    <slot
        v-if="finished"
        :="$attrs"
    ></slot>
    <slot
        v-else
        name="loader"
    >
        <Fill
            :center="!noCenter"
            :="$attrs"
        >
            <Loading
                :data="text"
                no-ellipsis
            />
        </Fill>
    </slot>
</template>

<style lang="scss" scoped></style>
