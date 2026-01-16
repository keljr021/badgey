import { createWebHistory, createRouter } from 'vue-router'

import Home from './../pages/Home.vue'
import Login from './../pages/Login.vue'

import Dashboard from './../pages/Dashboard.vue'
import Profile from './../pages/Profile.vue'
import CreateBadge from './../pages/CreateBadge.vue'
import ManageBadge from './../pages/ManageBadge.vue'
import RedeemBadge from './../pages/RedeemBadge.vue'
import ClaimBadge from './../pages/ClaimBadge.vue'
import Settings from './../pages/Settings.vue'

import About from './../pages/About.vue'
import Terms from './../pages/Terms.vue'
import Privacy from './../pages/Privacy.vue'
import Release from './../pages/Release.vue'
import Contact from './../pages/Contact.vue'
import Admin from './../pages/Admin.vue'

import PageNotFound from './../pages/PageNotFound.vue'


const routes = [
  { path: '/', name: 'home', component: Home },
  { path: '/login', name: 'login', component: Login },
  { path: '/dashboard', name: 'dashboard', component: Dashboard },
  { path: '/settings', name: 'settings', component: Settings },

  { path: '/badges', 
    children: [
      {
        path: 'create',
        name: 'create',
        component: CreateBadge
      },
      {
        path: 'manage',
        name: 'manage',
        component: ManageBadge
      },
      {
        path: 'redeem',
        name: 'redeem',
        component: RedeemBadge
      },
  ]},

  { path: '/profile/:id', 
    name: 'profile',
    component: Profile
  },
  { path: '/claim/:badgeId', name: 'claim', component: ClaimBadge },

  { path: '/about', name: 'about', component: About },
  { path: '/terms', name: 'terms', component: Terms },
  { path: '/privacy', name: 'privacy', component: Privacy },
  { path: '/release', name: 'release', component: Release },
  { path: '/contact', name: 'contact', component: Contact },
  { path: '/admin', name: 'admin', component: Admin },
  { path: '/notFound', name: 'notFound', component: PageNotFound},
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})