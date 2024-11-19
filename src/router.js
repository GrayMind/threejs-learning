import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
  { path: '/', component: () => import('./apps/first-demo/views/HelloWorld.vue') },
  { path: '/second', component: () => import('./apps/second-demo/views/HelloWorld.vue') },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
