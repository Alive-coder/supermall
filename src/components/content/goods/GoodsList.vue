<!-- 商品列表大组件 -->
<template>
  <div class="goods">
      <!-- 
          list中存储的是多个对象（30个），item就相当于是每一个对象，
          将每一个对象传给 GoodListItem 中进行布局展示
       -->
      <goods-list-item v-for="item in goods" :goodsItem="item" />
  </div>
</template>

<script>
import GoodsListItem from './GoodsListItem.vue'

export default {
  name: 'GoodsList',
  components: {
      GoodsListItem
  },
  data () {
    return {
    }
  },
  methods: {},
  props: {
      goods: {
        //   当前点击的是哪个list，就将哪个 list传到 goods中，然后再将数组中的每一个元素再细分给 GoodListItem
          type: Array,
          default(){
              return []
          }
      }
  }
}

</script>
<style scoped>
    .goods{
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;

        padding: 2px;
    }
</style>