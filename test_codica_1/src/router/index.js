import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../components/Home'
import Details from '../components/Details'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/:id',
    name: 'Details',
    component: Details
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
