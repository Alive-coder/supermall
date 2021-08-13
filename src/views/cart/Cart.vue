<template>
  <div class="cart">
    <nav-bar class="nav-bar">
      <!-- 这里的购物车的数量是 表示 商品的种类 -->
      <div slot="center">购物车({{getCartLength}})</div>
    </nav-bar>

    <!-- 显示购物车商品列表 -->
    <cart-list />

    <!-- 显示底部工具栏 -->
    <cart-bottom-bar />
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'

import CartList from './childComp/CartList'
import CartBottomBar from './childComp/CartBottomBar'

import {mapGetters} from 'vuex'

  export default {
    name: "Cart",
    components: {
      NavBar,
      CartList,
      CartBottomBar
    },
    computed: {
      ...mapGetters([
        "getCartLength"
      ])
    }
  }
</script>

<style scoped>
  .cart{
    height: 100vh;
  }
  .nav-bar{
    background-color: var(--color-tint);
    color: #fff;

  }
</style>
