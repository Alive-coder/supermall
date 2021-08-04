<template>
  <div id="home">
    <nav-bar class="homt-nav"><div slot="center">购物街</div></nav-bar>
    <tab-control :title= "['流行', '新款', '精选']" 
                   @tabClick="tabClick"
                   ref="tabControl1"
                   class="tab-constrol"
                   v-show="isTabShow"/>
    <scroll class="content" 
            ref="scroll" 
            :probeType="3" 
            :pullUpLoad = "true"
            @scroll='contentScroll'
            @pullingUp= 'loadMore'>
      <home-swiper :banners="banners" @swiperImageLoad='swiperImageLoad'/>
      <home-recommend :recommends="recommends" />
      <home-featuer />
      <tab-control :title= "['流行', '新款', '精选']" 
                   @tabClick="tabClick"
                   ref="tabControl2"/>
      <goods-list :goods= "goods[currentType].list" />
    </scroll>
    <!-- <ul>

      <li>列表1</li>
      <li>列表2</li>
      <li>列表3</li>
      <li>列表4</li>
      <li>列表5</li>
      <li>列表6</li>
      <li>列表7</li>
      <li>列表8</li>
      <li>列表9</li>
      <li>列表10</li>
      <li>列表11</li>
      <li>列表12</li>
      <li>列表13</li>
      <li>列表14</li>
      <li>列表15</li>
      <li>列表16</li>
      <li>列表17</li>
      <li>列表18</li>
      <li>列表19</li>
      <li>列表20</li>
      <li>列表21</li>
      <li>列表22</li>
      <li>列表23</li>
      <li>列表24</li>
      <li>列表25</li>
      <li>列表26</li>
      <li>列表27</li>
      <li>列表28</li>
      <li>列表29</li>
      <li>列表30</li>
      <li>列表31</li>
      <li>列表32</li>
      <li>列表33</li>
      <li>列表34</li>
      <li>列表35</li>
      <li>列表36</li>
      <li>列表37</li>
      <li>列表38</li>
      <li>列表39</li>
      <li>列表40</li>
      <li>列表41</li>
      <li>列表42</li>
      <li>列表43</li>
      <li>列表44</li>
      <li>列表45</li>
      <li>列表46</li>
      <li>列表47</li>
      <li>列表48</li>
      <li>列表49</li>
      <li>列表50</li>
      <li>列表51</li>
      <li>列表52</li>
      <li>列表53</li>
      <li>列表54</li>
      <li>列表55</li>
      <li>列表56</li>
      <li>列表57</li>
      <li>列表58</li>
      <li>列表59</li>
      <li>列表60</li>
      <li>列表61</li>
      <li>列表62</li>
      <li>列表63</li>
      <li>列表64</li>
      <li>列表65</li>
      <li>列表66</li>
      <li>列表67</li>
      <li>列表68</li>
      <li>列表69</li>
      <li>列表70</li>
      <li>列表71</li>
      <li>列表72</li>
      <li>列表73</li>
      <li>列表74</li>
      <li>列表75</li>
      <li>列表76</li>
      <li>列表77</li>
      <li>列表78</li>
      <li>列表79</li>
      <li>列表80</li>
      <li>列表81</li>
      <li>列表82</li>
      <li>列表83</li>
      <li>列表84</li>
      <li>列表85</li>
      <li>列表86</li>
      <li>列表87</li>
      <li>列表88</li>
      <li>列表89</li>
      <li>列表90</li>
      <li>列表91</li>
      <li>列表92</li>
      <li>列表93</li>
      <li>列表94</li>
      <li>列表95</li>
      <li>列表96</li>
      <li>列表97</li>
      <li>列表98</li>
      <li>列表99</li>
      <li>列表100</li>
    </ul> -->
    <back-top  @click.native="backClick" v-show="isShowBackTop"/>
  </div>

</template>

<script>

import HomeSwiper from './childComp/HomeSwiper'
import HomeRecommend from './childComp/HomeRecommed'
import HomeFeatuer from './childComp/HomeFeatuer.vue'

import NavBar from 'components/common/navbar/NavBar'
import TabControl from 'components/content/tabControl/TabControl'
import GoodsList from 'components/content/goods/GoodsList'
import Scroll from 'components/common/scroll/Scroll'
import BackTop from 'components/content/backTop/BackTop'

import {getHomeMultidata, getHomeGoods} from 'network/home'
import {debounce} from 'common/utils'

  export default {
    name: "Home",
    components: {
      NavBar,
      HomeSwiper,
      HomeRecommend,
      HomeFeatuer,
      TabControl,
      GoodsList,
      Scroll,
      BackTop
    },
    data() {
      return {
        // 我们需要将请求过来的数据进行保存，不然会被回收掉
        banners: [],
        recommends: [],
        // 存储商品信息
        goods: {
          'pop': {page: 0, list: []},
          'new': {page: 0, list: []},
          'sell': {page: 0, list: []},
        },
        currentType: 'pop',
        isShowBackTop: 'flase',
        // 记录 tab-control 的 offsetTop
        tabOffsetTop: 0,
        // 记录 tab-control1 是否显示
        isTabShow: false,
        // 保存离开 home 时的 Y 位置
        saveY: 0
      }
    },
    // 在创建组件的时候就发送网络请求
    created() {
      // 请求多个数据
      this.getHomeMultidata(),
      // 请求商品数据    调用当前对象下的 getHomeGoods 函数
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')

    },
    mounted() {
      // 这里需要考虑的是，需要在 mounted中进行监听，而不是在created中进行监听，在created中可能 scroll对象还没创建好
      // 当组件开始被创建时就开始监听图片是否加载完成

      // 防抖函数
      const refresh = debounce(this.$refs.scroll.refresh, 200)
      this.$bus.$on('itemImageLoad', () => {
        // console.log('6666')
        refresh()
      })

    },
    // 当进入 当前组件时, 将离开保存的 y 位置设置为进入时的 y 位置
    activated() {
      this.$refs.scroll.scrollTo(0, this.saveY, 0)
      // 当进入组件时，最好要设置重新刷新一下 scroll，以免发生错误
      this.$refs.scroll.refresh()
    },
    // 当离开 当前组件时，保存当前离开的位置
    deactivated() {
      this.saveY = this.$refs.scroll.getScrollY()
    },
    methods: {
      // 请求多个数据
      getHomeMultidata(){
        getHomeMultidata().then(res => {
        // console.log(res)
        // 将请求过来的数据保存起来，不会因为请求完成就销毁
        this.banners = res.data.data.banner.list
        this.recommends = res.data.data.recommend.list
        })
      },
      // 请求商品数据
      getHomeGoods(type){
        // 每调用一次，page 就加一,然后才能请求下一页的数据
        const page = this.goods[type].page + 1
        // 调用外部（home.js中）封装的 getHomeGoods 函数
        getHomeGoods(type, page).then(res => {
          // console.log(res)
          this.goods[type].list.push(...res.data.data.list) 
          this.goods[type].page += 1

          this.$refs.scroll.finishPullUp()
        })
      },

      tabClick(index){
        switch (index){
          case 0:
            this.currentType = 'pop'
            break
          case 1: 
            this.currentType = 'new'
            break
          case 2:
            this.currentType = 'sell'
            break
        }
        // 要设置两个 tab-control 的点击情况一致
        this.$refs.tabControl1.currentIndex = index
        this.$refs.tabControl2.currentIndex = index
      },
      backClick(){
        this.$refs.scroll.scrollTo(0, 0)
      },
      contentScroll(position){
        // console.log(position)  当 position.y > 1000 时显示出回到顶部按钮
        this.isShowBackTop = (-position.y) > 1000

        // 当滚动大于 tabOffsetTop 时就设置效果
        this.isTabShow = (-position.y) > this.tabOffsetTop
      },
      // 上拉加载更多
      loadMore(){
        this.getHomeGoods(this.currentType)
      },
      // 监听 swiper 图片加载完成 
      swiperImageLoad(){
        // tab-control 的吸顶效果   ----> 获取 tab-control 的 offsetTop
        this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
      }

    },
  }
</script>

<style scoped>
  .homt-nav{
    background-color: var(--color-tint);
    color: #fff;

    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 10;
  }
  #home{
    padding-top: 44px;
    height: 100vh;

    position: relative;
  }
  .content{
    /* height: 500px; */
    overflow: hidden;

    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;

  }
  .tab-constrol{
    position: relative;
    z-index: 9;
  }

</style>
