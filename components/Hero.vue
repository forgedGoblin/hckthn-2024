<script lang="ts" setup>
const {
    image = "https://images.unsplash.com/photo-1493612276216-ee3925520721",
    title = "Create the screens",
    subtitle = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
} = defineProps<{
    image?: string;
    title?: string;
    subtitle?: string;
}>();
</script>

<template>
    <Screen class="flex">
        <Fill center>
            <section class="max-w-screen-md">
                <slot name="default">
                    <span class="block text-6xl font-bold mb-1">{{
                        title
                    }}</span>
                    <p class="mt-0 mb-4 text-700 line-height-3">
                        {{ subtitle }}
                    </p>
                </slot>
            </section>
        </Fill>
        <div class="h-full w-1/2 relative">
            <img
                :src="image"
                alt="Image"
                class="md:ml-auto block md:h-full absolute z-0"
                style="clip-path: polygon(8% 0, 100% 0%, 100% 100%, 0 100%)"
            />
            <div class="z-10 absolute h-full w-full flex flex-col">
                <slot name="aside"> </slot>
            </div>
        </div>
    </Screen>
</template>

<style lang="scss" scoped></style>
