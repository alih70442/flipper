<template>
    <div class="pb-20"></div>
    <header class="fixed top-0 left-0 w-full bg-red-500 z-50 py-6">
        <div class="l-container flex space-x-6 rtl:space-x-reverse">
            <router-link
                to="/start"
                class="text-white font-bold text-sm"
                v-if="route_url !== '/start'"
            >
                <i class="icon-start text-xl p-1"></i>
            </router-link>
            <router-link
                to="/records"
                class="text-white font-bold text-sm"
                v-if="route_url !== '/records'"
            >
                <i class="icon-analytics text-xl p-1"></i>
            </router-link>
        </div>
    </header>
</template>

<script>

export default {
    data() {
        return {
            route_url: ''
        }
    },
    watch: {
        $route(newVal, oldVal) {
            this.route_url = this.$router.currentRoute._rawValue.path;
        }
    },
    computed: {
    },
    methods: {
    },
    created() {
        this.route_url = this.$router.currentRoute._rawValue.path;
    }
}

</script>

<style scoped>
</style>
