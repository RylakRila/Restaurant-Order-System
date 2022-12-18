import Vue from 'vue'
import Router from 'vue-router'
import Login from '../views/Login'
import Home from '../views/Home'
import Foods from '../views/Food'
import Confirm from '../views/Confirm'
import Payment from '../views/Payment'
import Complete from '../views/Complete'


Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/Home',
            name: 'Home Page',
            component: Home,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/Foods',
            name: 'Foods',
            component: Foods,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/Confirm',
            name: 'Confirm',
            component: Confirm,
            beforeEnter: Confirm.methods.beforeEnter,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/Payment',
            name: 'Payment',
            component: Payment,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/Complete',
            name: 'Complete',
            component: Complete,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/login',
            name: 'Login',
            component: Login
        }
    ]
})