import { createRouter, createWebHistory } from 'vue-router'
import GreetingView from '../views/GreetingView.vue'
import LandingView  from '../views/LandingView.vue'
import CustomView   from '../views/CustomView.vue'
import SettingView  from '../views/SettingView.vue'

export default createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/',         component: GreetingView },   // static greeting
    { path: '/admin',    component: LandingView  },   // choice/admin page
    { path: '/generate', component: CustomView   },   // link generator
    { path: '/costume',  component: GreetingView },   // custom greeting (query)
    { path: '/setting',  component: SettingView  },
    { path: '/:pathMatch(.*)*', redirect: '/admin' },
  ],
})
