<!-- 商品列表 小组件 -->
<template>
  <div class="goods-item" @click="itemClick"> 
      <img v-lazy="showImage" alt="" @load="imageLoad">
      <div class="goods-info">
        <p>{{goodsItem.title}}</p>
        <span class="price">{{goodsItem.price}}</span>
        <!-- 收藏 -->
        <span class="collect">{{goodsItem.cfav}}</span>
      </div>
  </div>
</template>

<script>
export default {
  name: 'GoodsListItem',
  data () {
    return {
    }
  },
  computed: {
    showImage(){
      return this.goodsItem.image || this.goodsItem.show.img
    }
  },
  methods: {
    // 当图片加载完成后会调用这个函数
    imageLoad(){
      this.$bus.$emit('itemImageLoad')
    },
    // 监听 item 的点击
    itemClick(){
      // console.log(this.goodsItem)
      // 当点击了 gooditem 时，会通过路由跳转到详情页面，再通过详情页面进行展示
      this.$router.push('detail/' + this.goodsItem.iid)
    }
  },
  props: {
      goodsItem: {
          type: Object,
          default(){
              return {}
          }
      }
  }
}

</script>
<style scoped>
.goods-item {
    padding-bottom: 40px;
    position: relative;

    width: 48%;
  }

  .goods-item img {
    width: 100%;
    border-radius: 5px;
  }

  .goods-info {
    font-size: 12px;
    position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;
    overflow: hidden;
    text-align: center;
  }

  .goods-info p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 3px;
  }

  .goods-info .price {
    color: var(--color-high-text);
    margin-right: 20px;
  }

  .goods-info .collect {
    position: relative;
  }

  .goods-info .collect::before {
    content: '';
    position: absolute;
    left: -15px;
    top: -1px;
    width: 14px;
    height: 14px;
    background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
  }
</style>