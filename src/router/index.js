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
        component: Dashboard,
        children: [
            {
                path: 'manager',
                component: () => import('../components/Manager.vue')
            },
            {
                path: 'archives',
                component: () => import('../components/Archives.vue')
            },
            {
                path: '',
                component: () => import('../components/Manager.vue')
            }
        ]
    }
]

const router = new VueRouter({
    base: process.env.BASE_URL,
    routes
})

export default router