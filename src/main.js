import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(Element, { size: 'small', zIndex: 3000 })

import axios from 'axios'
Vue.prototype.axios = axios

import api from './api'
Vue.prototype.api = api

Vue.config.productionTip = false

new Vue({
  components: { App },
  router,
  store,
  render: h => h(App),
}).$mount('#app')
