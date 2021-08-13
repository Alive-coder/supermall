import {
    ADD_COUNTER, 
    ADD_CART
} from './mutations-types'
 
// mutations 用于改变 state 的值 （方法, methods）, mutations 只处理单一事件
export default {
    [ADD_COUNTER](state, payload){
        payload.count += 1
    },
    [ADD_CART](state, payload){
        // 向 对象模型 中添加一个 checked 属性，用于记录购物车中的商品是否被选中
        payload.checked = true
        state.cartList.push(payload)
    }
}