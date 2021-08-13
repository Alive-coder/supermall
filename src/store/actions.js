import {
    ADD_COUNTER, 
    ADD_CART
} from './mutations-types'

export default {
    //  context 表示上下文(就相当于是 全局的 $store 对象)   ，而 payload 表示传入的参数
    addToCart(context, payload){
        // 在 cartList 中查找，如果找到了就会将 item 返回给 oldProduct
        /*  如果 item.iid === payload.iid  就说明已经存在和一个一样的商品，这个时候就不需要添加
        只需要增加商品的数量即可 ， 当相等时返回 true ，会将 item 的值 赋值给  oldProduct，
        否则 oldProduct 的值就为 null（不赋值）
         */
        return new Promise((resolve, reject) => {
            let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)
            // 对 oldProduct 进行判断
            // 当 oldProduct 有值时，就相当于是 payload
            if(oldProduct){     // 商品数量加一，
                // oldProduct.count += 1
                context.commit(ADD_COUNTER, oldProduct)
                resolve('商品数量加一')
            }else{
                payload.count = 1
                // context.state.cartList.push(payload)
                context.commit(ADD_CART, payload)
                resolve('添加商品到购物车中')
            }
        })

        
    }

}