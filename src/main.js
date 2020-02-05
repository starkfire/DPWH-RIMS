import Vue from 'vue'
import ElementUI from 'element-ui'
import VueRouter from 'vue-router'
import router from './router'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'

Vue.config.productionTip = false

import './assets/styles.css'

// mapbox
import './assets/styles/mapbox-gl.css'

Vue.use(VueRouter)
Vue.use(ElementUI)

new Vue({
  router,
  el: '#app',
  render: h => h(App)
})