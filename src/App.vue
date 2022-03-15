<template>
  <l-header></l-header>
  <div class="pt-8">
    <router-view></router-view>
  </div>
</template>

<script>
import LHeader from './components/layouts/Lheader.vue';

export default {
  components: [LHeader],
  data() {
    return {
    }
  },
  computed: {
  },
  methods: {
  },
  mounted() {
  }
}
</script>

<style>
</style>
