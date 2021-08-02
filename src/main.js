import Vue from 'vue'
import App from './App.vue'
import router from './router/index'

Vue.config.productionTip = false

// 这里创建的 $bus 就相当于是一个事件总线，可以作为中间的桥梁帮助监听事件的发生
Vue.prototype.$bus = new Vue()

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
