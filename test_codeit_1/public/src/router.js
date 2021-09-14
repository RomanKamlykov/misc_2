import { createRouter, createWebHashHistory } from 'vue-router';
import Home from './pages/HomePage.vue';
import Login from './pages/LoginPage.vue';
import Register from './pages/RegisterPage.vue';

const routes = [
  { path: '/', component: Home, meta: { requiresAuth: true } },
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  { path: '/:pathMatch(.*)*', redirect: '/' },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

// check authentification
router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (localStorage.getItem('auth-token') == null) next({ path: '/login' });
    else next();
  } else {
    next();
  }
});

export default router;
