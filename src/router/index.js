import { createWebHistory, createRouter } from 'vue-router'

import Home from './../pages/Home.vue'
import Login from './../pages/Login.vue'
import About from './../pages/About.vue'

const routes = [
  { path: '/', name: 'home', component: Home },
  { path: '/login', name: 'login', component: Login},
  { path: '/about', name: 'about', component: About },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})