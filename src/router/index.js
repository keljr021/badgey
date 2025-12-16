import { createWebHistory, createRouter } from 'vue-router'

import Home from './../pages/Home.vue'
import Login from './../pages/Login.vue'
import About from './../pages/About.vue'
import Terms from './../pages/Terms.vue'
import Privacy from './../pages/Privacy.vue'
import Release from './../pages/Release.vue'
import Contact from './../pages/Contact.vue'


const routes = [
  { path: '/', name: 'home', component: Home },
  { path: '/login', name: 'login', component: Login},
  { path: '/about', name: 'about', component: About },
  { path: '/terms', name: 'terms', component: Terms },
  { path: '/privacy', name: 'privacy', component: Privacy },
  { path: '/release', name: 'release', component: Release },
  { path: '/contact', name: 'contact', component: Contact },

]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})