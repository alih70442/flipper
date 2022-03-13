<template>
    <div class="card-wrapper flip-left" :class="{ 'flipped': is_flipped }" @click="flip($event)">
        <div class="card">
            <div class="front">
                <slot></slot>
            </div>
            <div class="back overflow-hidden">
                <img :src="image_url" alt="__SEO__" />
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        'index': {
            type: Number,
            required: true
        }
    },
    data() {
        return {
            is_flipped: false,
            solved: false
        }
    },
    computed: {
        image_url() {
            return '../src/assets/images/products/' + this.get_id() + '.jpg';
        }
    },
    methods: {
        get_id() {
            return this.index % 8 + 1;
        },
        flip($event) {
            if (this.is_flipped)
                $event.preventDefault();
            this.is_flipped = true;
            this.$emit('select-card', this.get_id(), this.index);
        },
        unflip() {
            this.is_flipped = false;
        }
    },
}
</script>

<style scoped>
.card-wrapper {
    display: inline-block;
    perspective: 1000px;
}
.card-wrapper .card {
    position: relative;
    cursor: pointer;
    transition-duration: 0.6s;
    transition-timing-function: ease-in-out;
    transform-style: preserve-3d;
}
.card-wrapper .card .front,
.card-wrapper .card .back {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
    transform: rotateX(0deg);
}
.card-wrapper .card .front {
    z-index: 2;
}
.card-wrapper.flip-left .card .back {
    transform: rotateY(-180deg);
}
.flipped {
    user-select: none;
    pointer-events: none;
}
.flipped .card {
    transform: rotateY(-180deg);
}
.card-wrapper,
.card {
    width: 100px;
    height: 100px;
    margin: 10px;
}
.card .front,
.card .back {
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid #fc545e;
    border-radius: 4px;
}
.card .front {
    color: #fc545e;
    background: #ffffff;
    font-weight: 700;
    font-size: 1rem;
}
.card .back {
    font-size: 1.5rem;
    color: #ffffff;
    background: #fc545e;
}
/* w-20 h-20 flex-center bg-red-500 text-white text-2xl shadow-inner shadow-black/40 rounded-md */
</style>
