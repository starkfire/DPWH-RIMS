import VueRouter from 'vue-router'

import Home from '../views/Home.vue'
import Dashboard from '../views/Dashboard.vue'

const routes = [
    {
        path: '/',
        component: Home
    },
    {
        path: '/dashboard',
        component: Dashboard
    },
    {
        path: '/settings',
        component: () => import('../views/Settings.vue')
    }
]

const router = new VueRouter({
    base: process.env.BASE_URL,
    routes
})

export default router