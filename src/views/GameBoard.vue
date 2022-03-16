<template>
    <div class="l-container">
        <div class="flex items-center justify-between s-full">
            <!-- <div class="text-xl text-black">امتیاز شما {{ score }}</div> -->
            <div class="flex items-center text-xl text-black font-bold">
                <i class="icon-chess text-xl ml-1"></i>
                {{ choice_count }}
            </div>
            <div class="flex items-center text-xl text-black font-bold js-timer">
                <span class="js-sec">00</span>
                :
                <span class="js-min">00</span>
                <i class="icon-timer text-xl mr-1"></i>
            </div>
        </div>
        <div class="flex justify-center w-full mt-6">
            <div class="w-[296px] xs:w-full flex flex-wrap flex-row-reverse justify-center">
                <flip-card
                    v-for="(number, index) in numbers"
                    :key="number"
                    :index="number"
                    @select-card="choose"
                    ref="cards"
                >{{ index + 1 }}</flip-card>
            </div>
        </div>
    </div>
</template>

<script>
import FlipCard from './../components/FlipCard.vue';
import Timeout from './../assets/js/classes/Timeout';
import Timer from './../assets/js/classes/Timer';
import shuffle_array from './../assets/js/functions/array/shuffle';
import { ArrayStorage } from './../assets/js/classes/Storage';

export default {
    components: [FlipCard],
    data() {
        return {
            is_playing: false,

            time: 120,
            choice_count: 40,
            full_choice_count: 40,

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
            const is_lost = this.choice_count <= 0 || 16 - this.paired_indexes.length > this.choice_count + 1;
            return is_lost;
        }
    },
    watch: {
        is_lost(newVal, oldVal) {
            if (newVal)
                this.execute_on_lose();
        }
    },
    methods: {
        edit_options(time, moves_count) {
            this.time = time;
            this.full_choice_count = moves_count;
            this.choice_count = moves_count;

            const formated_time = Timer.format_digitally(this.time);
            const selector_timer = document.querySelector('.js-timer');
            selector_timer.querySelector('.js-sec').innerText = Timer.decorate(formated_time.sec);
            selector_timer.querySelector('.js-min').innerText = Timer.decorate(formated_time.min);
        },
        choose(id, index) {
            if (this.timer === null)
                this.start_timer();

            this.choice_count--;

            if (this.choice_count < 0) {
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
                    if (this.$refs.cards[first_card] !== null)
                        this.$refs.cards[first_card].unflip();
                    if (this.$refs.cards[second_card] !== null)
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
                    this.is_playing = true;
                },
                on_end: () => {
                    this.execute_on_lose();
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

            this.choice_count = this.full_choice_count;
            this.score = 0;
            this.first_choose = null;
            this.second_choose = null;
            this.first_index = null;
            this.second_index = null;
            this.numbers = [...Array(16).keys()];
            this.paired_indexes = [];

            this.numbers = shuffle_array(this.numbers);
            // this.solve();
        },
        execute_on_lose() {
            console.log('on lose');
            let lose_text = 'حرکت هایتان به پایان رسیده است.';

            this.is_playing = false;

            if (this.timer !== null)
                this.timer.pause();

            if (this.choice_count > 0) {
                lose_text = 'تعداد حرکاتتان برای پایان بازی کافی نیست.';
            }

            if (this.timer.get_remaining() <= 0) {
                lose_text = 'زمان بازی به پایان رسیده است.';
            }

            this.save_infos(false);

            this.$swal.fire({
                icon: 'error',
                title: 'شما باختید!',
                text: lose_text,
                showCancelButton: true,
                confirmButtonText: 'لیست نتایج',
                cancelButtonText: 'شروع دوباره',
                reverseButtons: true
            }).then((result) => {
                if (result.isConfirmed) {
                    this.$router.push('/records');
                } else {
                    this.$router.push('/start');
                }
            })
        },
        execute_on_win() {
            console.log('on win');
            if (this.timer !== null)
                this.timer.pause();

            this.is_playing = false;

            this.save_infos();

            this.$swal.fire({
                icon: 'success',
                title: 'شما برنده شدید!',
                text: 'ایول، حرکاتت هم دقیق بود و هم به جا!',
                showCancelButton: true,
                confirmButtonText: 'لیست نتایج',
                cancelButtonText: 'شروع دوباره',
                reverseButtons: true
            }).then((result) => {
                if (result.isConfirmed) {
                    this.$router.push('/records');
                } else {
                    this.$router.push('/start');
                }
            })
        },
        save_infos(is_win = true) {
            const game_data = {
                'id': (new Date()).getTime(),
                'is_win': is_win,
                'choice_count': this.full_choice_count,
                'used_choice_count': this.full_choice_count - this.choice_count,
                'time': this.time,
                'used_time': this.time - this.timer.get_remaining(),
                'local_time': (new Date()).toLocaleString()
            };

            const storage = ArrayStorage.create('records');
            storage.push(game_data);
        }
    },
    mounted() {
        this.restart_game();

        this.edit_options(this.$route.query.time, this.$route.query.moves_count);
    },
    beforeUnmount() {
        if (this.timer !== null) {
            this.timer.set_on_end_cb(() => { });
            this.timer = null;
        }
    },
    beforeRouteLeave(to, from, next) {
        if (this.timer !== null) {
            this.timer.pause();
        }

        if (this.is_playing) {

            this.$swal.fire({
                icon: 'info',
                title: 'اخطار!',
                text: 'بازی کاملا به پایان نرسیده است، با ترک این صفحه اطلاعات آن نیز از بین میرود!',
                showCancelButton: true,
                confirmButtonText: 'ترک بازی',
                cancelButtonText: 'ادامه بازی',
                reverseButtons: true
            }).then((result) => {
                if (result.isConfirmed) {
                    next();
                } else {
                    this.timer.start();
                }
            })
        } else {
            next();
        }
    }
}
</script>

<style>
</style>
