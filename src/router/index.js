import { createRouter, createWebHistory } from "vue-router";

import FormIntro from './../views/FormIntro.vue';
import GameBoard from './../views/GameBoard.vue';
import GameRecords from './../views/GameRecords.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', redirect: { name: 'form-intro' } },
        { path: '/start', component: FormIntro, name: 'form-intro' },
        { path: '/board', component: GameBoard, name: 'game-board' },
        { path: '/records', component: GameRecords, name: 'game-records' },
        { path: '/:notFound(.*)', redirect: { name: 'form-intro' } },
    ]
});

export default router;
