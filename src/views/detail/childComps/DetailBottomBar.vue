<!-- 底部 导航栏 -->
<template>
  <div class="bottom-bar">
      <div class="bar-item bar-left">
          <div>
              <i class="icon service"></i>
              <span class="text">客服</span>
          </div>
          <div>
              <i class="icon shop"></i>
              <span class="text">店铺</span>
          </div>
          <div>
              <i class="icon select"></i>
              <span class="text">收藏</span>
          </div>
       </div>
       <div class="bar-item bar-right" @click="addToCart">
            <div class="cart">加入购物车</div>
            <div class="buy">购买</div>
       </div>
  </div>
</template>

<script>
export default {
  name: 'DetailBottomBar',
  data () {
    return {
    }
  },
  methods: {
      addToCart(){
        //   console.log('添加购物车')
        this.$emit('addToCart')
      }
  },
}

</script>
<style scoped>
    .bottom-bar{
        position: fixed;
        /* bottom: 35px; */
        right: 0;
        left: 0;
        bottom: 0px;
        background-color: #fff;
        height: 49px;

        display: flex;
        text-align: center;
        width: 100%;
    }
    .bar-item{
        flex: 1;
        display: flex;
    }
    .bar-item > div{
        flex: 1;
    }
    .bar-left .text{
        font-size: 13px;
    }
    .bar-left .icon{
        display: block;
        width: 22px;
        height: 22px;
        margin: 5px auto 3px;
        background-color: red;
    }
    .bar-left .service{
        background-position: 0 -54px;
    }
    .bar-left .shop{
        background-position: 0 -98px;
    }
    .bar-right{
        font-size: 15px;
        color: #fff;
        line-height: 49px;
    }
    .bar-right .cart{
        background-color: #ffe817;
        color: #333;
    }
    .bar-right .buy{
        background-color: #f69;
    }
    .sport-ball{
        position: absolute;
        left: 225px;
        bottom: 20px;
    }
</style>