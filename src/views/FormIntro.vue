<template>
  <h1 class="text-2xl font-bold text-gray-800 text-center">به بازی فلیپر خوش آمدید!</h1>
  <p
    class="text-gray-600 text-center mt-4"
  >برای شروع بازی، تنظیمات آنرا وارد کرده و روی دکمه شروع کلیک کنید.</p>
  <div class="flex flex-col mt-6">
    <label for="input-moves" class="text-gray-600 mb-2">تعداد حرکات</label>
    <input
      type="number"
      id="input-moves"
      min="16"
      class="c-input"
      v-model="moves_count"
      @change="set_range"
    />
    <p class="text-sm text-red-500 mt-2" v-html="error_moves_count"></p>
  </div>
  <div class="flex flex-col mt-4">
    <label for="input-time" class="text-gray-600 mb-2">
      زمان بازی
      <span class="text-xs text-gray-400">(به ثانیه)</span>
    </label>
    <input type="number" id="input-time" min="0" class="c-input" v-model="time" @change="set_range" />
    <p class="text-sm text-red-500 mt-2" v-html="error_time"></p>
  </div>
  <div class="flex flex-col mt-4">
    <p class="text-gray-600 text-left mb-2">{{ range_text }}</p>
    <input
      type="range"
      id="input-range"
      min="20"
      max="100"
      step="10"
      v-model="range"
      @change="set_options"
    />
    <!-- <p class="text-sm text-red-500 mt-2" v-html="error_range"></p> -->
  </div>
  <button
    type="button"
    class="c-btn w-full mt-4"
    :class="{ 'disabled': is_btn_disbled }"
    @click="submit"
  >شروع</button>
</template>

<script>
import ArrayRand from './../assets/js/classes/array/rand';


export default {
  emits: ['start-game'],
  data() {
    return {
      range: 40,
      range_text: 'بدک نیست',

      moves_count: 40,
      time: 120,
      ratio: 40,
      error_moves_count: '',
      error_time: '',

      quotes: [],
    }
  },
  computed: {
    is_btn_disbled() {
      let is_disabled = false;

      this.error_moves_count = '';
      if (this.moves_count === '') {
        this.error_moves_count = 'تعداد حرکات نمی&zwnj;تواند خالی باشد.'
        is_disabled = true;
      } else if (this.moves_count < 16) {
        this.error_moves_count = 'تعداد حرکات نمی&zwnj;تواند از 16  کمتر باشد.'
        is_disabled = true;
      }

      this.error_time = '';
      if (this.time === '') {
        this.error_time = 'زمان بازی نمی&zwnj;تواند خالی باشد.'
        is_disabled = true;
      } else if (this.time < 0) {
        this.error_time = 'زمان بازی نمی&zwnj;تواند از 0  کمتر باشد.'
        is_disabled = true;
      }

      return is_disabled;
    },
    difficalty() {
      return this.moves_count / 120 * this.time / 80;
    }
  },
  methods: {
    set_options() {
      this.moves_count = this.range * 80 / 100;
      this.time = this.range * 120 / 100;

      this.set_label();
    },
    set_label() {
      if (0.8 < this.difficalty) {
        if (this.quotes[5] === undefined)
          this.quotes[5] = ArrayRand.create([
            'میخوای اصلا بازی نکنی؟',
            'مگه بچه بازیه؟',
            'جوابارو بهت بگم راحت بشی؟',
            'پوووففف!',
          ])
        this.range_text = this.quotes[5].get();
      } else if (0.6 < this.difficalty) {
        if (this.quotes[4] === undefined)
          this.quotes[4] = ArrayRand.create([
            'من که چشم آب نمیخوره!',
            'بالاخره هرکی از یه جایی باید شروع کنه!',
            'اگه سختته راحتتر هم هست!',
          ])
        this.range_text = this.quotes[4].get();
      } else if (0.4 < this.difficalty) {
        if (this.quotes[3] === undefined)
          this.quotes[3] = ArrayRand.create([
            'ببینم چی کار میکنی!',
            'میانه روی تو دوست دارم!',
            'مواظب خودت باش فقط!',
          ])
        this.range_text = this.quotes[3].get();
      } else if (0.2 < this.difficalty) {
        if (this.quotes[2] === undefined)
          this.quotes[2] = ArrayRand.create([
            'دمت گرم!',
            'میتونی بازی رو هیجان انگیزترم بکنی ها!',
            'یکم هیجانش رو بیشتر کن!',
          ])
        this.range_text = this.quotes[2].get();
      } else if (this.difficalty < 0.2) {
        if (this.quotes[1] === undefined)
          this.quotes[1] = ArrayRand.create([
            'بریم آتیشش بزنیم!',
            'حاجی یه دونه ای!',
            'گاد آف فلیپر!',
          ])
        this.range_text = this.quotes[1].get();
      }
    },
    set_range() {
      const ratio = (this.time / 120 + this.moves_count / 80) / 2;
      this.set_label();

      const range_val = Math.floor(ratio * 100);
      if (range_val < 20)
        this.range = 20;
      else if (range_val > 100)
        this.range = 100;
      else {
        this.range = range_val;
      }
    },
    submit() {
      this.$router.push({ path: '/board', query: { time: this.time, moves_count: this.moves_count } });
    }
  }
}

</script>

<style scoped>
</style>
