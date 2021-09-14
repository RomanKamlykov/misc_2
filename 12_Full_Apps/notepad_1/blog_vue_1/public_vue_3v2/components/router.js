// import { createRouter, createWebHashHistory } from '../libs/vue-router.esm-browser.js'; // некорректный импор в текущей версии vue-router.esm-browser
const { createRouter, createWebHashHistory } = VueRouter;
import { Home } from './Home.js';
import { Note } from './Note.js';
import { Edit } from './Edit.js';
import { Login } from './Login.js';
import { Register } from './Register.js';
import { Error } from './Error.js';

const Foo = { template: '<div>foo</div>' }

const routes = [
  { path: '/', component: Home },
  { path: '/note/:id', component: Note, props: true },
  { path: '/edit/:id', component: Edit, props: true },
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  { path: '/error', component: Error },
  { path: '/notes-tree', component: Foo },
]

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
