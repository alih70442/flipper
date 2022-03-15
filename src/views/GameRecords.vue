<template>
    <section class="container">
        <div class="flex items-center justify-between">
            <h1 class="text-2xl text-gray-800 font-extrabold">نتایج ثبت شده</h1>
        </div>
        <div class="overflow-auto">
            <ul class="min-w-[976px] w-full mt-6">
                <li class="bg-gray-100 dark:bg-gray-700 flex text-xs font-bold text-right">
                    <div
                        class="w-1/12 py-3 px-6 text-xs font-medium tracking-wider text-gray-700 uppercase dark:text-gray-400"
                    >#</div>
                    <div
                        class="w-2/12 py-3 px-6 text-xs font-medium tracking-wider text-gray-700 uppercase dark:text-gray-400"
                    >تعداد حرکت کل</div>
                    <div
                        class="w-3/12 py-3 px-6 text-xs font-medium tracking-wider text-gray-700 uppercase dark:text-gray-400"
                    >تعداد حرکت انجام شده</div>
                    <div
                        class="w-2/12 py-3 px-6 text-xs font-medium tracking-wider text-gray-700 uppercase dark:text-gray-400"
                    >زمان کل</div>
                    <div
                        class="w-2/12 py-3 px-6 text-xs font-medium tracking-wider text-gray-700 uppercase dark:text-gray-400"
                    >زمان صرف شده</div>
                    <div
                        class="w-1/12 py-3 px-6 text-xs font-medium tracking-wider text-gray-700 uppercase dark:text-gray-400"
                    >ضریب</div>
                    <div
                        class="w-1/12 py-3 px-6 text-xs font-medium tracking-wider text-gray-700 uppercase dark:text-gray-400"
                    ></div>
                </li>

                <li
                    class="flex border-b odd:bg-white even:bg-gray-50 odd:dark:bg-gray-800 even:dark:bg-gray-700 dark:border-gray-600"
                    v-for="(record, index) in records"
                    :key="record.id"
                >
                    <div
                        class="w-1/12 py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >{{ index }}</div>
                    <div
                        class="w-2/12 py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >{{ record.choice_count }}</div>
                    <div
                        class="w-3/12 py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >{{ record.used_choice_count }}</div>
                    <div
                        class="w-2/12 py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >{{ record.time }}</div>
                    <div
                        class="w-2/12 py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >{{ record.used_time }}</div>
                    <div
                        class="w-1/12 py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >{{ calc_ratio(record.used_choice_count, record.choice_count, record.used_time, record.time) }}</div>
                    <div
                        class="w-1/12 py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                        <button type="button" @click="remove_record(record.id)">حذف</button>
                    </div>
                </li>
            </ul>
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
    methods: {
        calc_ratio(time, full_time, choice, full_choice) {
            let ratio = (time / full_time + choice / full_choice) / 2;
            return Math.round(ratio * 100) / 100;
        },
        remove_record(id) {
            this.records = this.records.filter(record => record.id !== id);

            const storage = ArrayStorage.create('records');
            storage.set(this.records);
        }
    },
    mounted() {
        const storage = ArrayStorage.create('records');

        this.records = storage.get();

        console.log(this.records);
    }
}
</script>

<style>
</style>
