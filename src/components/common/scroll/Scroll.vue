<!-- 对于滚动的封装 
    better-scroll 的 scrollerHeight 属性表示的是可以滚动的高度
-->
<template>
  <div ref="wrapper">
      <div>
          <slot></slot>
      </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'

export default {
  name: 'Scroll',
  props: {
    probeType: {
      // 当需要实时监听使设置为 3， 只需要监听手指点击时设置为 2
      type: Number,
      // 当类型为对象或数组时，默认值要是一个函数
      default: 0
    },
    pullUpLoad: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
        scroll: null
    }
  },
  methods: {
    // 回到顶部，调用 better-scroll 的 scrollTop方法，可以到达某一位置
    scrollTo(x, y, time = 300){
      this.scroll && this.scroll.scrollTo(x, y, time)
    },
    finishPullUp(){
      this.scroll && this.scroll.finishPullUp()
    },
    refresh(){
      // console.log('---')
      this.scroll && this.scroll.refresh()
    },
    getScrollY(){
      // 获取离开当前组件时 y 的值
      return this.scroll.y ? this.scroll.y : 0
    }
  },
  components: {
      BScroll
  },
//   当组件被挂载时在绑定 scroll
  mounted() {

    //   在 vue 中使用 refs 可以用来指定某个组件或元素
    // 创建 better-scroll 对象
      this.scroll = new BScroll(this.$refs.wrapper, {
        // 设置在滚动范围内 div或span 等标签可以点击
        click: true,
        // 实时监听滚动
        probeType: this.probeType,
        // 监听下拉加载
        pullUpLoad: this.pullUpLoad
      })
    // 实时监听滚动位置 (当 probeType 等于 2或者等于3 才需要进行监听)
      if (this.probeType === 2 || this.probeType ===3){
        this.scroll.on('scroll', (position) => {
          // console.log(position)  需要将 position 对象传出去(自定义事件)
          this.$emit('scroll', position)
        })
      }
    // 上拉加载更多   只有 pullUpLoad 设置为 true时才进行监听
      if(this.pullUpLoad){
        this.scroll.on('pullingUp', () => {
          // console.log('上拉加载更多')  将这个事件传出去
          this.$emit('pullingUp')
        })
      }
      
  },

}

</script>
<style scoped>
</style>