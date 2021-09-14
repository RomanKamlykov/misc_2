const Vue = require('vue')
const App = require('./app.vue')

new Vue({
  el: '#app',
  render: function (createElement) {
    return createElement(App)
  }
})
const body = getElementById('id').addEventListener('')
// new Vue({
//   render: h => h(App),
// }).$mount('#app')
