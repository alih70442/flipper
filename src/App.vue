<template>
  <l-header></l-header>
  <div class="pt-8">
    <router-view v-slot="{ Component }">
      <transition name="router" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<script>
import LHeader from './components/layouts/Lheader.vue';

export default {
  components: [LHeader],
}
</script>
