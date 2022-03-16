<template>
    <section class="container">
        <div class="flex items-center justify-between">
            <h1 class="text-2xl text-gray-800 font-extrabold">
                نتایج ثبت شده
                <span class="text-sm text-gray-400">({{ records_count }})</span>
            </h1>
        </div>
        <div class="overflow-x-auto lg:overflow-hidden mt-6">
            <div class="min-w-[976px] w-full">
                <div class="w-full bg-gray-100 dark:bg-gray-700 flex text-xs font-bold text-right">
                    <div
                        class="w-[3%] py-3 px-6 text-xs font-medium tracking-wider text-gray-700 uppercase dark:text-gray-400"
                    >#</div>
                    <div
                        class="w-[15%] py-3 px-6 text-xs font-medium tracking-wider text-gray-700 uppercase dark:text-gray-400"
                    >تاریخ بازی</div>
                    <div
                        class="w-[13%] py-3 px-6 text-xs font-medium tracking-wider text-gray-700 uppercase dark:text-gray-400"
                    >وضعیت</div>
                    <div
                        class="w-[12%] py-3 px-6 text-xs font-medium tracking-wider text-gray-700 uppercase dark:text-gray-400"
                    >حرکت کل</div>
                    <div
                        class="w-[16%] py-3 px-6 text-xs font-medium tracking-wider text-gray-700 uppercase dark:text-gray-400"
                    >حرکت انجام شده</div>
                    <div
                        class="w-[10%] py-3 px-6 text-xs font-medium tracking-wider text-gray-700 uppercase dark:text-gray-400"
                    >زمان کل</div>
                    <div
                        class="w-[15%] py-3 px-6 text-xs font-medium tracking-wider text-gray-700 uppercase dark:text-gray-400"
                    >زمان صرف شده</div>
                    <div
                        class="w-[8%] py-3 px-6 text-xs font-medium tracking-wider text-gray-700 uppercase dark:text-gray-400"
                    >ضریب</div>
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
                            class="w-[3%] py-4 px-6 text-sm font-medium whitespace-nowrap bg-gray-800 text-white"
                        >{{ index + 1 }}</div>
                        <div
                            class="w-[15%] py-4 px-6 text-sm font-medium whitespace-nowrap bg-gray-800 text-white"
                        >{{ record.local_time }}</div>
                        <div
                            class="w-[13%] py-4 px-6 text-sm font-medium whitespace-nowrap bg-gray-800"
                            :class="record.is_win ? 'text-green-500': 'text-red-500'"
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
                        >{{ record.is_win ? calc_ratio(record.used_choice_count, record.choice_count, record.used_time, record.time) + '%' : '-' }}</div>
                        <div
                            class="w-[8%] py-4 px-6 text-sm font-medium whitespace-nowrap bg-gray-800 text-white"
                        >
                            <button type="button" @click="remove_record(record.id)">
                                <i class="icon-trash text-lg text-red-400"></i>
                            </button>
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
</template>

<script>
import { ArrayStorage } from './../assets/js/classes/Storage';

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
        }
    },
    methods: {
        calc_ratio(time, full_time, choice, full_choice) {
            const choice_ratio = 1 - (choice - 16) / (full_choice - 16);
            const time_ratio = 1 - (time - 16) / (full_time - 16);

            const ratio = (choice_ratio + time_ratio) / 2;
            return Math.round(ratio * 100);
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
