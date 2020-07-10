import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false
import elementUI from 'element-ui'
import router from '@/router/index'
Vue.use(elementUI)
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
