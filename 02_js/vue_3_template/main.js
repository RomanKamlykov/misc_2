import { createApp } from './libs/vue.esm-browser.js';
import { MyComponent } from './components/MyComponent.js';

const RootComponent = {
  components: {
    'my-component': MyComponent
  },
  template: '<my-component />',
}

const app = createApp(RootComponent);
const vm = app.mount('#app');
