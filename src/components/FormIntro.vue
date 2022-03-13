<template>
  <h1 class="text-2xl font-bold text-gray-800 text-center">به بازی فلیپر خوش آمدید!</h1>
  <p
    class="text-gray-600 text-center mt-4"
  >برای شروع بازی، تنظیمات آنرا وارد کرده و روی دکمه شروع کلیک کنید.</p>
  <div class="flex flex-col mt-6">
    <label for="input-moves" class="text-gray-600 mb-2">تعداد حرکات</label>
    <input type="number" id="input-moves" class="c-input" v-model="choice_count" />
  </div>
  <div class="flex flex-col mt-4">
    <label for="input-time" class="text-gray-600 mb-2">
      زمان بازی
      <span class="text-xs text-gray-400">(به ثانیه)</span>
    </label>
    <input type="number" id="input-time" class="c-input" v-model="time" />
  </div>
  <button
    type="submit"
    class="c-btn w-full mt-4"
    :class="{ 'disabled': is_btn_disbled }"
    @click="submit"
  >شروع</button>
</template>

<script>

export default {
  emits: ['start-game'],
  data() {
    return {
      choice_count: 40,
      time: 120
    }
  },
  computed: {
    is_btn_disbled() {
      return this.choice_count === '' || this.time === '';
    }
  },
  methods: {
    submit() {
      this.$emit('start-game', this.time, this.choice_count);
    }
  }
}

</script>

<style scoped>
</style>
