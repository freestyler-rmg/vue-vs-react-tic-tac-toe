import { createMemoryHistory, createRouter, createWebHistory } from 'vue-router';

import TicTacToe from '../pages/TicTacToe.vue';

const routes = [{ path: '/', component: TicTacToe }];

const router = createRouter({
  history: createMemoryHistory(),
  routes
});

export default router;
