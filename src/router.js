import { createRouter, createWebHashHistory } from 'vue-router';

import HelloWorld from './components/HelloWorld.vue';
import HelloWorld2 from './components/HelloWorld2.vue';

const routes = [
  { path: '/', component: HelloWorld },
  { path: '/about', component: HelloWorld2 },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
