import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import router from '@/router/index'
Vue.use(ElementUI)
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
