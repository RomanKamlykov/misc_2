import router from './components/router.js';
// const App = httpVueLoader('./components/App.vue');
// const App = { template: '<router-view></router-view>' }

new Vue({
  router,
  render: h => h({ template: '<router-view></router-view>' })
}).$mount('#root');
