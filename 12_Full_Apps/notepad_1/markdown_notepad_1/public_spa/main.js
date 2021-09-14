// import { createApp } from './libs/vue.esm-browser.js';
// import { RouterView } from './libs/vue-router.esm-browser.js'; // некорректный импор в текущей версии vue-router.esm-browser
const { createApp } = window.Vue;
const { RouterView } = window.VueRouter;
import { router } from './components/router.js'; 

const template = '<RouterView />';
const components = { RouterView };
const RootComponent = { template, components };

const app = createApp(RootComponent);
app.use(router);
const vm = app.mount('#app');
