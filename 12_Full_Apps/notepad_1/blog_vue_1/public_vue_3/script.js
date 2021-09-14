const { loadModule } = window['vue3-sfc-loader'];
import { options } from './components/options.js';
const App = { template: '<div>123</div>' }
// const Page = loadModule('./components/Page.vue');
const Page = Vue.defineAsyncComponent(() => loadModule('./components/Page.vue', options))

Vue.createApp(Page).mount('#root')
