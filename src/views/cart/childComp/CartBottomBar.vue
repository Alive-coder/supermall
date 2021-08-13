<!-- 购物车底部工具栏 -->
<template>
  <div class="bottom-bar">
      <div class="check-content">
          <check-button  
                    class="check-button" 
                    :isChecked='isSelectAll'
                    @click.native="checkClick"/>
          <span>全选</span>
      </div>

      <!-- 合计 -->
      <div class="totalPrice">
          合计: ￥{{totalPrice}}
      </div>

      <!-- 去计算 -->
      <div class="calculate">
          去计算({{totalCount}})
      </div>
  </div>
</template>

<script>
import CheckButton from 'components/content/checkButton/CheckButton'

import { mapGetters } from 'vuex'

export default {
  name: 'CartBottomBar',
  data () {
    return {
    }
  },
  components: {
      CheckButton
  },
  methods: {
      checkClick(){
        //   如果全部选中，就全部不选中
          if(this.isSelectAll){
                this.cartList.forEach(item => item.checked = false)
          }else{        // 如果全部不选中或者部分被选中，就全部选中
                this.cartList.forEach(item => item.checked = true)
          }
      }
  },
  computed: {
      ...mapGetters(['cartList']),
    //   合计
      totalPrice(){
          return this.cartList.filter(item => {
              return item.checked
          }).reduce((preValue, item) => {
              return preValue + item.price * item.count
          }, 0).toFixed(2)
      },
    //   去计算
      totalCount(){
          return this.cartList.filter(item => {
              return item.checked
          }).reduce((preValue, item) => {
              return preValue + item.count
          }, 0)
      },
    //   全选
      isSelectAll(){
        //   当购物车为空时，返回 false
          if(this.cartList.length === 0) return false
        //   先查找是否有未被选中的商品，如果有返回这个商品对象， isSelectAll 的值就为 false
          return  !(this.cartList.find(item => !item.checked))
        //   或者 （使用 filter 进行遍历，如果有未选中的，就有长度，再取反返回 false）
        // return !this.cartList.filter(item => !item.checked).length
      }
  },
}

</script>
<style scoped>
    .bottom-bar{
        background-color: #eee;
        height: 40px;
        position: relative;
        /* bottom: 40px; */
        line-height: 40px;
        display: flex;
    }
    .check-content{
        display: flex;
        width: 100px;
    }
    .check-button{
        width: 20px;
        height: 20px;
        margin: 5px 6px 0 6px;
    }
    .totalPrice{
        /* margin-left: 50px; */
        flex: 1;
    }
    .calculate{
        width: 100px;
        background-color: var(--color-tint);
        text-align: center;
    }
</style>