import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
  { path: '/', component: () => import('./apps/first-demo/views/HelloWorld.vue') },
  { path: '/2', component: () => import('./apps/second-demo/views/HelloWorld.vue') },
  { path: '/3', component: () => import('./apps/3-demo/views/HelloWorld.vue') },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
