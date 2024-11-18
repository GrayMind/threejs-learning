import { createRouter, createWebHashHistory } from 'vue-router';

import HelloWorld2 from './components/HelloWorld2.vue';

const routes = [
  { path: '/', component: () => import('./apps/first-demo/views/HelloWorld.vue') },
  { path: '/about', component: HelloWorld2 },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
