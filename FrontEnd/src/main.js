import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import qs from 'qs'
import { BootstrapVue, IconsPlugin} from 'bootstrap-vue'

Vue.prototype.$axios = axios;
Vue.prototype.qs = qs;
Vue.prototype.$backEndUrl = 'http://localhost:3000/api/'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

Vue.use(require('vue-cookies'))

Vue.config.productionTip = false

Vue.filter('toCurrency', function(value) {
  if(typeof value !== "number") {
    return value;
  }
  var formatter = new Intl.NumberFormat('en-CA', {
    style: 'currency',
    currency: 'CAD'
  });
  return formatter.format(value);
})

router.beforeEach((to, from, next) => {

  if(to.meta.requiresAuth) {
    const check = localStorage.getItem('token')
    if(check !== null) {
      next()
    }
    else {
      next({
        path: '/Login'
      }) 
    }
  }
  else {
    next()
  }
})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
