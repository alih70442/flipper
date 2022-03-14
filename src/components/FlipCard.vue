<template>
    <div class="c-card flip-left" :class="{ 'c-card--flipped': is_flipped }" @click="flip($event)">
        <div class="c-card__inner">
            <div class="c-card__side c-card__front">
                <slot></slot>
            </div>
            <div class="c-card__side c-card__back">
                <img :src="image_url" alt="__SEO__" />
            </div>
        </div>
    </div>
</template>

<script>
export default {
    emits: ['select-card'],
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
    // mounted() {
    //     console.log(this.index);
    // }
}
</script>

<style scoped  lang="scss">
.c-card {
    $parent: #{&};

    display: inline-block;
    perspective: 1000px;
    margin: 10px;

    @at-root #{$parent}__inner {
        width: 100px;
        height: 100px;

        position: relative;
        cursor: pointer;
        transition-duration: 0.6s;
        transition-timing-function: ease-in-out;
        transform-style: preserve-3d;

        @at-root #{$parent}__side {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            backface-visibility: hidden;
            transform: rotateX(0deg);

            display: flex;
            align-items: center;
            justify-content: center;
            border: 1px solid #fc545e;
            border-radius: 4px;
        }

        @at-root #{$parent}__back {
            overflow: hidden;
            font-size: 1.5rem;
            color: #ffffff;
            background: #fc545e;

            transform: rotateY(-180deg);
        }

        @at-root #{$parent}__front {
            color: #ffffff;
            background: #fc545e;
            font-weight: 700;
            font-size: 1.5rem;
            z-index: 2;
        }
    }

    &--flipped {
        user-select: none;
        pointer-events: none;
        #{$parent}__inner {
            transform: rotateY(-180deg);
        }
    }
}
</style>
