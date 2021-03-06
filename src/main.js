import Vue from 'vue'
import App from '@/App.vue'
import router from '@/router'
import 'bootstrap/dist/css/bootstrap.css'
import VTooltip from 'v-tooltip'
import Copy from 'v-copy'
import store from '@/store.js'

Vue.config.productionTip = false

Vue.use(VTooltip)
Vue.use(Copy)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
