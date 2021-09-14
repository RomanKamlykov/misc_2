import { Home } from './components/Home.js';
const { createApp } = Vue;

const template = '<Home />';
const components = { Home };
const RootComponent = { template, components };

// const template = '<RouterView />';
// const components = { RouterView };
// const RootComponent = { template, components };

const app = createApp(RootComponent);
const vm = app.mount('#app');
