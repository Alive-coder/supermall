<!-- 详情组件 -->
<template>
  <div id="detail">
      <detail-nav-bar class="detail-nav-bar" />
      <scroll class="content" ref="scroll">
        <detail-swiper :topImages="topImages" />
        <detail-base-info :goods='goods' />
        <detail-shop-info :shop='shop' />
        <detail-goods-info :detail-info='detailInfo' @imageLoad='imageLoad'/>
        <detail-param-info :param-info='paramInfo' />
        <detail-comment-info :comment-info='commentInfo' />
        <goods-list :goods='recommends' />
      </scroll>
  </div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar'
import DetailSwiper from './childComps/DetailSwiper'
import DetailBaseInfo from './childComps/DetailBaseInfo'
import DetailShopInfo from './childComps/DetailShopInfo'
import DetailGoodsInfo from './childComps/DetailGoodsInfo'
import DetailParamInfo from './childComps/DetailParamInfo'
import DetailCommentInfo from './childComps/DetailCommentInfo'

import GoodsList from 'components/content/goods/GoodsList'

import Scroll from 'components/common/scroll/Scroll'

import {getDetail, Goods,  Shop, GoodsParam, getRecommends} from 'network/detail'

export default {
  name: 'Detail',
  data () {
    return {
      iid: null,
      topImages: [],
    //   商品信息
      goods: {},
    //   店铺信息
      shop: {},
    //   商品详情信息
      detailInfo: {},
    // 商品参数信息
      paramInfo: {},
    //   商品评论信息
      commentInfo: {},
    //   推荐信息
      recommends: []
    }
  },
  components: {
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      Scroll,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      GoodsList
  },
  methods: {
    //   当图片加载完成调用这个方法，使 scroll 进行刷新
      imageLoad(){
          this.$refs.scroll.refresh()
      }
  },
  created() {
    //  接收 gooditem 传过来的 iid
      this.iid = this.$route.params.iid
    // console.log(this.$route.params.iid)

    // 发送网络请求
    getDetail(this.iid).then(res => {
        // console.log(res)
        // 1，获取轮播图图片信息
        const data = res.data.result
        this.topImages = data.itemInfo.topImages
        // 商品信息
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
        // 店铺信息
        this.shop = new Shop(data.shopInfo)
        // 商品详情信息
        this.detailInfo = data.detailInfo
        // 商品参数信息
        this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)
        // 商品评论信息
        if(data.rate.cRate !== 0){
            this.commentInfo = data.rate.list[0]
        }
        

    })

    // 发送推荐请求
    getRecommends().then(res => {
        console.log(res)
        this.recommends = res.data.data.list
    })

  },
}

</script>
<style scoped>
    #detail{
        position: relative;
        z-index: 9;
        background-color: #fff;
        height: 100vh;
    }
    .detail-nav-bar{
        position: relative;
        z-index: 9;
        background-color: #fff;
    }
    .content{
        height: calc(100% - 44px);
    }
</style>