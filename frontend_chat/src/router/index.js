import { createRouter, createWebHistory } from 'vue-router';

// eslint-disable-next-line import/extensions
import AuthorizationComponent from '../components/AuthorizationComponent';

// eslint-disable-next-line import/extensions
import ChatRoom from '../components/ChatRoom';

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
  history: createWebHistory(),
  routes,
});

export default router;
