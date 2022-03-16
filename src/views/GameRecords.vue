<template>
    <div class="container">
        <section>
            <div class="flex items-center justify-between">
                <h1 class="text-2xl text-gray-800 font-extrabold">خلاصه نتایج</h1>
            </div>
            <div class="flex flex-wrap -mx-2 mt-4">
                <div class="w-full sm:w-4/12 lg:w-3/12 px-2 mb-4">
                    <div class="rounded-xl bg-gray-800 p-6">
                        <h2 class="text-lg font-bold text-gray-400">کل بازی ها</h2>
                        <p
                            class="text-2xl font-extrabold text-gray-200 text-left mt-4"
                        >{{ this.records_count }} بار</p>
                    </div>
                </div>
                <div class="w-full sm:w-4/12 lg:w-3/12 px-2 mb-4">
                    <div class="rounded-xl bg-gray-800 p-6">
                        <h2 class="text-lg font-bold text-gray-400">درصد برد</h2>
                        <p
                            class="text-2xl font-extrabold text-gray-200 text-left mt-4"
                        >{{ win_percent }}%</p>
                    </div>
                </div>
                <div class="w-full sm:w-4/12 lg:w-3/12 px-2 mb-4">
                    <div class="rounded-xl bg-gray-800 p-6">
                        <h2 class="text-lg font-bold text-gray-400">دقت کل</h2>
                        <p
                            class="text-2xl font-extrabold text-gray-200 text-left mt-4"
                        >{{ accuracy_percent }}%</p>
                    </div>
                </div>
            </div>
        </section>
        <section class="mt-8">
            <div class="flex flex-wrap items-center justify-between">
                <h1 class="text-2xl text-gray-800 font-extrabold mb-2">
                    نتایج ثبت شده
                    <span class="text-sm text-gray-400">({{ records_count }})</span>
                </h1>
                <div class="mb-2">
                    <button
                        type="button"
                        class="c-btn"
                        v-if="records_count"
                        @click="reset_data"
                    >حذف همه ریکوردها</button>
                </div>
            </div>
            <div class="overflow-x-auto lg:overflow-hidden mt-6">
                <div class="min-w-[1100px] w-full">
                    <div
                        class="w-full bg-gray-100 dark:bg-gray-700 flex text-xs font-bold text-right"
                    >
                        <div
                            class="w-[3%] py-3 px-6 text-xs font-medium tracking-wider text-gray-700 uppercase dark:text-gray-400 bg-gray-700 sticky right-0"
                        >#</div>
                        <div
                            class="w-[15%] py-3 px-6 text-xs font-medium tracking-wider text-gray-700 uppercase dark:text-gray-400"
                        >تاریخ بازی</div>
                        <div
                            class="w-[13%] py-3 px-6 text-xs font-medium tracking-wider text-gray-700 uppercase dark:text-gray-400"
                        >
                            <button type="button" @click="sort($event, 'is_win')" data-asc="true">
                                <i class="icon-sort text-xs ml-1"></i>
                                وضعیت
                            </button>
                        </div>
                        <div
                            class="w-[12%] py-3 px-6 text-xs font-medium tracking-wider text-gray-700 uppercase dark:text-gray-400"
                        >
                            <button
                                type="button"
                                @click="sort($event, 'choice_count')"
                                data-asc="true"
                            >
                                <i class="icon-sort text-xs ml-1"></i>حرکت کل
                            </button>
                        </div>
                        <div
                            class="w-[16%] py-3 px-6 text-xs font-medium tracking-wider text-gray-700 uppercase dark:text-gray-400"
                        >
                            <button
                                type="button"
                                @click="sort($event, 'used_choice_count')"
                                data-asc="true"
                            >
                                <i class="icon-sort text-xs ml-1"></i>
                                حرکت انجام شده
                            </button>
                        </div>
                        <div
                            class="w-[10%] py-3 px-6 text-xs font-medium tracking-wider text-gray-700 uppercase dark:text-gray-400"
                        >
                            <button type="button" @click="sort($event, 'time')" data-asc="true">
                                <i class="icon-sort text-xs ml-1"></i>زمان کل
                            </button>
                        </div>
                        <div
                            class="w-[15%] py-3 px-6 text-xs font-medium tracking-wider text-gray-700 uppercase dark:text-gray-400"
                        >
                            <button
                                type="button"
                                @click="sort($event, 'used_time')"
                                data-asc="true"
                            >
                                <i class="icon-sort text-xs ml-1"></i>زمان صرف شده
                            </button>
                        </div>
                        <div
                            class="w-[8%] py-3 px-6 text-xs font-medium tracking-wider text-gray-700 uppercase dark:text-gray-400"
                        >
                            <button type="button" @click="sort($event, 'accuracy')" data-asc="true">
                                <i class="icon-sort text-xs ml-1"></i>دقت
                            </button>
                        </div>
                        <div
                            class="w-[8%] py-3 px-6 text-xs font-medium tracking-wider text-gray-700 uppercase dark:text-gray-400"
                        ></div>
                    </div>
                    <transition-group name="list" tag="ul" class="w-full">
                        <li
                            class="flex border-b odd:bg-white even:bg-gray-50 dark:border-gray-600"
                            v-for="(record, index) in records"
                            :key="record.id"
                        >
                            <div
                                class="w-[3%] py-4 px-6 text-sm font-medium whitespace-nowrap bg-gray-800 text-white sticky right-0"
                            >{{ index + 1 }}</div>
                            <div
                                class="w-[15%] py-4 px-6 text-sm font-medium whitespace-nowrap bg-gray-800 text-white"
                            >{{ record.local_time }}</div>
                            <div
                                class="w-[13%] py-4 px-6 text-sm font-medium whitespace-nowrap bg-gray-800"
                                :class="record.is_win ? 'text-green-500' : 'text-red-500'"
                            >{{ record.is_win ? 'برنده' : 'بازنده' }}</div>
                            <div
                                class="w-[12%] py-4 px-6 text-sm font-medium whitespace-nowrap bg-gray-800 text-white"
                            >{{ record.choice_count }}</div>
                            <div
                                class="w-[16%] py-4 px-6 text-sm font-medium whitespace-nowrap bg-gray-800 text-white"
                            >{{ record.used_choice_count }}</div>
                            <div
                                class="w-[10%] py-4 px-6 text-sm font-medium whitespace-nowrap bg-gray-800 text-white"
                            >{{ record.time }}</div>
                            <div
                                class="w-[15%] py-4 px-6 text-sm font-medium whitespace-nowrap bg-gray-800 text-white"
                            >{{ record.used_time }}</div>
                            <div
                                class="w-[8%] py-4 px-6 text-sm font-medium whitespace-nowrap bg-gray-800 text-white"
                            >{{ record.is_win ? record.accuracy + '%' : '-' }}</div>
                            <div
                                class="w-[8%] py-4 px-6 text-sm font-medium whitespace-nowrap bg-gray-800 text-white"
                            >
                                <!-- <button type="button" @click="remove_record(record.id)">
                                    <i class="icon-trash text-lg text-red-400"></i>
                                </button>-->
                            </div>
                        </li>
                    </transition-group>
                </div>
                <div
                    class="text-center py-4 text-sm text-gray-400"
                    v-if="!records_count"
                >رکوردی برای نمایش وجود ندارد.</div>
            </div>
        </section>
    </div>
</template>

<script>
import { ArrayStorage } from './../assets/js/classes/Storage';
import { round } from './../assets/js/functions/game';

export default {
    components: [],
    data() {
        return {
            records: [],
        }
    },
    computed: {
        records_count() {
            return this.records.length;
        },
        win_percent() {
            const win_percent = round(this.records.filter(item => item.is_win == true).length / this.records_count * 100);
            return isNaN(win_percent) ? '-' : win_percent
        },
        accuracy_percent() {
            let all_percent = 0;
            let count = 0;
            this.records.forEach(item => {
                if (item.is_win == true) {
                    all_percent += item.accuracy;
                    count++;
                }
            }) * 100;
            const accuracy_percent = round(all_percent / count);
            return isNaN(accuracy_percent) ? '-' : accuracy_percent;
        }
    },
    methods: {
        sort($event, sort_header) {
            const sort_btn = $event.target;
            const is_asc = sort_btn.getAttribute('data-asc') === 'true';
            this.records.sort((a, b) => {
                return is_asc ? b[sort_header] - a[sort_header] : a[sort_header] - b[sort_header];
            });
            sort_btn.setAttribute('data-asc', !is_asc);
        },
        remove_record(id) {
            this.records = this.records.filter(record => record.id !== id);

            const storage = ArrayStorage.create('records');
            storage.set(this.records);
        },
        add_fake_records() {
            const storage = ArrayStorage.create('records');
            for (const item of [1, 2, 3, 4, 5])
                storage.push({
                    'id': (new Date()).getTime() + item,
                    'is_win': item % 2,
                    'choice_count': 20 + item,
                    'used_choice_count': 20 - item,
                    'time': 30 + item,
                    'used_time': 20 - item,
                    'local_time': (new Date()).toLocaleString()
                });
        },
        reset_data() {

            this.$swal.fire({
                icon: 'info',
                title: 'اخطار!',
                text: 'با ادامه این روند تمامی اطلاعات بازی حذف میشوند!',
                showCancelButton: true,
                confirmButtonText: 'حذف همه',
                cancelButtonText: 'برگشت',
                reverseButtons: true
            }).then((result) => {
                if (result.isConfirmed) {
                    const storage = ArrayStorage.create('records');
                    storage.set([]);
                    this.records = [];
                }
            })
        }
    },
    mounted() {
        const storage = ArrayStorage.create('records');
        this.records = storage.get();

        // this.add_fake_records();
    }
}
</script>

<style>
</style>
