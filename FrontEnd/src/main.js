import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import qs from 'qs'
import { BootstrapVue, IconsPlugin} from 'bootstrap-vue'

Vue.prototype.$axios = axios;
Vue.prototype.qs = qs;

// Import Bootstrap and BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

Vue.use(require('vue-cookies'))

Vue.config.productionTip = false

// Currency format
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
  console.log('to: ', to)
  console.log('form: ', from)

  if(to.meta.requiresAuth) {
    const check = localStorage.getItem('token')
    console.log(check === null)
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
