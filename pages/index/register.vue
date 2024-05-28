<script lang="ts" setup>
const router = useRouter();
</script>

<template>
    <Fill
        class="bg-stone-900 dmsans"
        center
    >
        <Register
            @success="router.push('/login')"
            login="/login"
        />
    </Fill>
</template>

<style lang="scss" scoped></style>
