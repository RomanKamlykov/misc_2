// 2-й вариант

import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import VueApollo from 'vue-apollo'

const httpLink = new HttpLink({
    // URL to graphql server, you should use an absolute URL here
    uri: 'https://graphql-pokemon.now.sh'
})

// create the apollo client
const apolloClient = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache()
})

// install the vue plugin
Vue.use(VueApollo)

import Vue from 'vue'
import App from './App.vue'

const apolloProvider = new VueApollo({
  defaultClient: apolloClient
})

// update Vue instance by adding `apolloProvider`
new Vue({
  apolloProvider,
  render: h => h(App)
}).$mount('#app')