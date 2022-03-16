function calc_accuracy(time, used_time, choice_count, used_choice_count) {
    const choice_ratio = 1 - (used_choice_count - 16) / (choice_count - 16);
    const time_ratio = 1 - (used_time - 16) / (time - 16);

    const ratio = (choice_ratio + time_ratio) / 2;

    return round(ratio * 100);
}

function round(number, afters = 2) {
    return Math.round(number * Math.pow(10, afters)) / Math.pow(10, afters);
}

export { calc_accuracy, round };