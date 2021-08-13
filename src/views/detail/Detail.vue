<!-- 详情组件 -->
<template>
  <div id="detail">
      <detail-nav-bar class="detail-nav-bar" @itemClick='itemClick' ref="nav"/>
      <scroll class="content" 
              ref="scroll"
              @scroll='contentScroll'
              :probeType='3'>
        <detail-swiper :top-images="topImages" />
        <detail-base-info :goods='goods' />
        <detail-shop-info :shop='shop' />
        <detail-goods-info :detail-info='detailInfo' @imageLoad='imageLoad' />
        <detail-param-info :param-info='paramInfo'  ref="param"/>
        <detail-comment-info :comment-info='commentInfo' ref="comment" />
        <goods-list :goods='recommends'  ref="recommend"/>
      </scroll>
      <detail-bottom-bar @addToCart='addToCart' />
       <back-top  @click.native="backClick" v-show="isShowBackTop"/>
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
import DetailBottomBar from './childComps/DetailBottomBar.vue'

import GoodsList from 'components/content/goods/GoodsList'

import Scroll from 'components/common/scroll/Scroll'

import {itemListenerMixin , BackTopMixin} from 'common/mixins'
import {debounce} from 'common/utils'

import {getDetail, Goods,  Shop, GoodsParam, getRecommends} from 'network/detail'

import { mapActions } from 'vuex'

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
      recommends: [],
      // 记录各个组件的 offsetTop
      themeTopYs: [],
      // 记录防抖函数 用于记录 offsetTop
      getThemeTopY: null,
      // 记录当前处于哪个位置，切换成对于的导航栏按钮,用于不判断那么多次
      currentIndex: 0,
    }
  },
  mixins: [itemListenerMixin, BackTopMixin],
  components: {
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      Scroll,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      GoodsList,
      DetailBottomBar,
  },
  methods: {
    // 映射 addToCart 方法
      ...mapActions({
        add: 'addToCart'
      }),

    //   当图片加载完成调用这个方法，使 scroll 进行刷新
      imageLoad(){
          this.$refs.scroll.refresh()

          this.getThemeTopY()
      },
      // 监听 nav-bar 的点击
      itemClick(index){
        this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 200)
        // console.log('点击成功')
      },
      // 监听 scroll 的滚动
      contentScroll(position){
        // 记录 滚动的纵坐标
        const positionY = -position.y

        const length = this.themeTopYs.length

        // 方法一： 
        // for(let i = 0; i < length; i++){
        //   /* 1.先判断 currentIndex 是否和 i 相等，如果在区域内就相等，就不会重新赋值，只有滚动到其他区域
        //   才会重新赋值，  2.判断 i 在数组中的索引位置  3. 判断 positionY 的位置坐标
        //   */
        //   if((this.currentIndex !== i) && ((i < length -1 && positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1]) || 
        //     (i === length -1 && positionY >= this.themeTopYs[length - 1]))){
        //       this.currentIndex = i
        //       // console.log(i)
        //       this.$refs.nav.currentIndex = this.currentIndex
        //   }
        // }

        // 方法二:
        for(let i = 0; i < length - 1; i++){
          if((this.currentIndex !== i) && positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1]){
            this.currentIndex = i
            this.$refs.nav.currentIndex = this.currentIndex
          }
        }


         // console.log(position)  当 position.y > 1000 时显示出回到顶部按钮
        this.isShowBackTop = (-position.y) > 1000

        // console.log(positionY)
      },
      addToCart(){
        // 1. 先获取商品信息
        const product = {}
        product.image = this.topImages[0]
        product.title = this.goods.title
        product.desc = this.goods.desc
        product.price = this.goods.realPrice
        product.iid = this.iid
        product.count = 0
        // 2.添加到 购物车中 (添加到 VueX 中)
        // this.$store.commit('addToCart', product)

        // this.$store.dispatch('addToCart', product).then(res => {
        //   console.log(res)    //只有执行完成操作之后才会执行 res
        // })
        // add 为将商品添加到购物车中
        this.add(product).then(res => {
          this.$toast.show(res)
        })

        // 3.显示弹窗

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

    // 记录 防抖函数
    this.getThemeTopY = debounce(() => {
      this.themeTopYs = []
      this.themeTopYs.push(0)
      // 商品参数
      this.themeTopYs.push(this.$refs.param.$el.offsetTop)
      // 商品评论
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
      // 商品推荐
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
      // 在数组最后添加一个最大的数
      this.themeTopYs.push(Number.MAX_VALUE)
    })

  },
  mounted() {
//       // 防抖函数
//       const refresh = debounce(this.$refs.scroll.refresh, 200)
// //    记录 itemImgLoad 函数
//       this.itemImgLoad = () => {
//         refresh()
//       }
//       this.$bus.$on('itemImageLoad', this.itemImgLoad)
  },
//  离开页面时
  destroyed() {
      this.$bus.$off('itemImageLoad', this.itemImgLoad)
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
        height: calc(100% - 44px - 49px);
    }
</style>