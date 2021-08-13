import Vue from 'vue'
import VueX from 'vuex'

import mutations from './mutations'
import actions from './actions'
import getters from './getters'

// 1.安装插件
Vue.use(VueX)

    // state 状态  （存储数据）
const state = {
    cartList: []
}

// 2.创建 Store 对象
const store = new VueX.Store({
    state,
    mutations,
    actions,
    getters
})

// 3.挂载在 Vue 实例上
export default store