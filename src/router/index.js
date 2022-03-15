import { createRouter, createWebHistory } from "vue-router";

import FormIntro from './../views/FormIntro.vue';
import GameBoard from './../views/GameBoard.vue';

export default createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', redirect: { name: 'formIntro' } },
        { path: '/start', component: FormIntro, name: 'form-intro' },
        { path: '/board', component: GameBoard, name: 'game-board' },
        // { path: '/records', component: FormIntro, name: 'records' },
    ]
});