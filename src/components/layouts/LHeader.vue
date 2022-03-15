<template>
    <header class="fixed top-0 left-0 w-full bg-red-500 z-50 py-6">
        <div class="l-container space-x-6 rtl:space-x-reverse">
            <button class="text-white font-bold text-sm" @click="restart">شروع مجدد</button>
            <button class="text-white font-bold text-sm">نتایج کل</button>
        </div>
    </header>
</template>

<script>

export default {
    emits: ['restart'],
    data() {
        return {
        }
    },
    computed: {
    },
    methods: {
        restart() {
            this.$router.push('/start')
        }
    }
}

</script>

<style scoped>
</style>
