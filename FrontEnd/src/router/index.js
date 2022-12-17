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
            component: Home
        },
        {
            path: '/Foods',
            name: 'Foods',
            component: Foods
        },
        {
            path: '/Confirm',
            name: 'Confirm',
            component: Confirm
        },
        {
            path: '/Payment',
            name: 'Payment',
            component: Payment
        },
        {
            path: '/Complete',
            name: 'Complete',
            component: Complete
        },
        {
            path: '/login',
            name: 'Login',
            component: Login
        }
    ]
})