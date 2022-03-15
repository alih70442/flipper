class Storage {

    constructor(key) {
        this.key = key;
    }

    get() {
        throw new Error("Abstract Method has no implementation --> get()");
    }

    set(data) {
        localStorage.setItem(this.key, JSON.stringify(data));
    }

    static create(key) {
        return new Storage(key);
    }
}

class ArrayStorage extends Storage {

    constructor(key) {
        super(key);
    }

    get() {
        let data = JSON.parse(localStorage.getItem(this.key));

        if (!data)
            data = [];

        return data;
    }

    push(...inputs) {
        let data = this.get();

        for (const item of inputs)
            data.push(item);

        this.set(data);
    }

    remove(index) {
        let data = this.get();

        data.splice(index, 1);

        this.set(data);
    }

    reset() {
        this.set([]);
    }

    static create(key) {
        return new ArrayStorage(key);
    }
}

export { ArrayStorage };