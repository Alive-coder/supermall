<!-- cart 中的 商品列表展示 -->
<template>
  <div class="cart-list">
      <scroll class="content" ref="scroll">
          <cart-list-item 
            v-for="(item,index) in cartList"
            :item-info='item'
            :key="index" />
      </scroll>
  </div>
</template>

<script>
import Scroll from 'components/common/scroll/Scroll'

import CartListItem from './CartListItem'

import {mapGetters} from 'vuex'

export default {
  name: 'CartList',
  data () {
    return {
    }
  },
  components: {
    Scroll,
    CartListItem
  },
  methods: {},
  computed: {
    ...mapGetters(['cartList'])
  },
  activated() {
    //   当进入购物车界面时就对 scroll  进行刷新
    this.$refs.scroll.refresh()
  },
}

</script>
<style scoped>
    .cart-list{
        height: calc(100% - 44px - 49px - 40px);
        overflow: hidden;
    }
    .content{
        height: 100%;
    }
</style>