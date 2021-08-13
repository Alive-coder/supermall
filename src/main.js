import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/index'

import toast from 'components/common/toast'

// 导入 fastclick 库
import FastClick from 'fastclick'

// 导入 vue-lazyload
import VueLazyLoad from 'vue-lazyload'

Vue.config.productionTip = false

// 这里创建的 $bus 就相当于是一个事件总线，可以作为中间的桥梁帮助监听事件的发生
Vue.prototype.$bus = new Vue()

//安装 toast 插件 
Vue.use(toast)

// 使用 vue-lazyload 插件
Vue.use(VueLazyLoad, {
  loading: require('./assets/img/common/placeholder.png')
})

// 使用 fastclick
FastClick.attach(document.body)

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
