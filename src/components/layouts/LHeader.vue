<template>
    <div class="pb-20"></div>
    <header class="fixed top-0 left-0 w-full bg-red-500 z-50 py-6">
        <div class="l-container space-x-6 rtl:space-x-reverse">
            <router-link to="/start" class="text-white font-bold text-sm">شروع مجدد</router-link>
            <router-link to="/records" class="text-white font-bold text-sm">نتایج کل</router-link>
        </div>
    </header>
</template>

<script>

export default {
    data() {
        return {
        }
    },
    computed: {
    },
    methods: {
    }
}

</script>

<style scoped>
</style>
