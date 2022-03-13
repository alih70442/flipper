<template>
  <div class="flex-center w-screen h-screen">
    <div class="my-auto">
      <div class="flex items-cnter">
        <div class="text-xl text-black">امتیاز شما {{ score }}</div>
      </div>
      <div class="flex flex-wrap flex-row-reverse w-[480px]">
        <div v-for="(number, index) in numbers" :key="number">
          <flip-card :index="number" @select-card="choose" ref="cards">{{ index + 1 }}</flip-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import FlipCard from './components/FlipCard.vue';

export default {
  compoentnts: ['FlipCard'],
  data() {
    return {
      score: 0,
      first_choose: null,
      second_choose: null,
      first_index: null,
      second_index: null,
      numbers: [...Array(16).keys()],
      matched_indexes: []
    }
  },
  methods: {
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
      if (!this.first_choose) {
        this.first_choose = id;
        this.first_index = index;
      }
      else if (!this.second_choose) {
        this.second_choose = id;
        this.second_index = index;
      }

      if (this.first_choose && this.second_choose) {

        if (this.first_choose === this.second_choose) {
          this.score++;
          this.matched_indexes.push(this.first_index, this.second_index);
        } else {
          this.unflip_all();
        }

        this.reset_choices();
      }
    },
    reset_choices() {
      this.first_choose = null;
      this.second_choose = null;
    },
    unflip_all() {
      setTimeout(() => {
        for (let i = 0; this.$refs.cards.length > i; i++) {
          if (!this.matched_indexes.includes(i))
            this.$refs.cards[i].unflip();
        }
      }, 2000);
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
    }
  },
  mounted() {
    this.numbers = this.shuffle_array(this.numbers);
    this.solve();
  }
}
</script>

<style>
</style>
