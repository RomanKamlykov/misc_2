import { createApp } from 'vue'
import RootComponent from './RootComponent.vue'
import router from './router'
import store from './store'

createApp(RootComponent).use(store).use(router).mount('#app')
