import { createRouter, createWebHistory } from 'vue-router';

import AuthorizationComponent from '../components/AuthorizationComponent.vue';
import ChatRoom from '../components/ChatRoom.vue';

const routes = [
  {
    path: '/',
    name: AuthorizationComponent,
    component: AuthorizationComponent,
  },
  {
    path: '/chat',
    name: ChatRoom,
    component: ChatRoom,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
