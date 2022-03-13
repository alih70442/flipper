<template>
  <div class="flex-center w-screen h-screen">
    <div class="my-auto">
      <div class="w-[480px] anim-fadeIn" v-show="!is_game_started">
        <form-intro @start-game="edit_game"></form-intro>
      </div>
      <div class="w-[480px] anim-fadeIn" v-show="is_game_started">
        <div class="flex items-center justify-between s-full">
          <!-- <div class="text-xl text-black">امتیاز شما {{ score }}</div> -->
          <div class="text-xl text-black font-bold">تعداد حرکت: {{ choice_count }}</div>
          <div class="text-xl text-black font-bold js-timer">
            زمان:
            <span class="js-sec">00</span>
            :
            <span class="js-min">00</span>
          </div>
        </div>
        <div class="flex flex-wrap flex-row-reverse w-full mt-6">
          <div v-for="(number, index) in numbers" :key="number">
            <flip-card :index="number" @select-card="choose" ref="cards">{{ index + 1 }}</flip-card>
          </div>
        </div>
        <button type="button" class="c-btn" v-if="is_lost" @click="restart_game">شروع دوباره</button>
      </div>
    </div>
  </div>
</template>

<script>
import FlipCard from './components/FlipCard.vue';
import FormIntro from './components/FormIntro.vue';
import Timeout from './../src/assets/js/classes/Timeout';
import Timer from './../src/assets/js/classes/Timer';

export default {
  components: [FlipCard, FormIntro],
  data() {
    return {
      is_game_started: false,
      time: 120,
      choice_count: 40,

      score: 0,
      timer: null,
      first_choose: null,
      second_choose: null,
      first_index: null,
      second_index: null,
      numbers: [...Array(16).keys()],
      paired_indexes: []
    }
  },
  computed: {
    is_lost() {
      return this.choice_count <= 0;
    }
  },
  methods: {
    edit_game(time, choice_count) {
      this.time = time;
      this.choice_count = choice_count;

      const formated_time = Timer.format_digitally(this.time);
      const selector_timer = document.querySelector('.js-timer');
      selector_timer.querySelector('.js-sec').innerText = Timer.decorate(formated_time.sec);
      selector_timer.querySelector('.js-min').innerText = Timer.decorate(formated_time.min);

      this.is_game_started = true;
    },
    shuffle_array(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      }
      return array;
    },
    choose(id, index) {
      if (this.timer === null)
        this.start_timer();

      this.choice_count--;

      if (this.choice_count <= 0) {
        this.execute_on_lose();
        return;
      }

      if (!this.first_choose) {
        this.first_choose = id;
        this.first_index = index;
      }
      else if (!this.second_choose) {
        this.second_choose = id;
        this.second_index = index;
      }

      if (this.first_choose !== null && this.second_choose !== null) {

        if (this.first_choose === this.second_choose) {
          this.score++;
          this.paired_indexes.push(this.first_index, this.second_index);
          if (this.paired_indexes.length === 16)
            this.execute_on_win();
        } else {
          this.unflip_double(this.first_index, this.second_index);
        }

        this.reset_choices();
      }
    },
    reset_choices() {
      this.first_choose = null;
      this.second_choose = null;
    },
    unflip_double(first_card, second_card) {
      Timeout.create({
        time: 1000,
        callback: () => {
          this.$refs.cards[first_card].unflip();
          this.$refs.cards[second_card].unflip();
        }
      }).init();
    },
    solve() {
      let answer = [];
      for (let i = 0; this.numbers.length > i; i++) {
        let pair = [i + 1];
        const first = this.numbers[i] % 8;

        for (let j = 0; this.numbers.length > j; j++) {
          if (i !== j && this.numbers[j] % 8 === first)
            pair.push(j + 1);
        }
        answer.push(pair);
      }
      console.log(answer);
    },
    start_timer() {
      const selector_timer = document.querySelector('.js-timer');
      this.timer = Timer.create({
        selector: selector_timer,
        sec: selector_timer.querySelector('.js-sec'),
        min: selector_timer.querySelector('.js-min'),
        init_time: this.time,
        on_start: () => {
          console.log('timer started');
        },
        on_end: () => {
          console.log('timer finished');
        }
      });
      this.timer.start();
    },
    restart_game() {
      if (this.timer !== null)
        this.timer.pause();

      const selector_flipped = document.querySelectorAll('.c-card--flipped');
      for (const selector of selector_flipped)
        selector.classList.remove('c-card--flipped');

      this.is_game_started = false;
      this.time = 120;
      this.choice_count = 40;
      this.score = 0;
      this.timer = null;
      this.first_choose = null;
      this.second_choose = null;
      this.first_index = null;
      this.second_index = null;
      this.numbers = [...Array(16).keys()];
      this.paired_indexes = [];

      this.numbers = this.shuffle_array(this.numbers);
      this.solve();
    },
    execute_on_lose() {
      if (this.timer !== null)
        this.timer.pause();

      console.log('you lose!');
    },
    execute_on_win() {
      console.log('you win!');
    }
  },
  mounted() {
    this.restart_game();
  }
}
</script>

<style>
</style>
