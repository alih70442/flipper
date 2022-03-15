<template>
  <l-header></l-header>
  <div class="flex-center w-screen h-screen pt-20">
    <div class="my-auto">
      <div class="l-container">
        <router-view></router-view>
      </div>
    </div>
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
