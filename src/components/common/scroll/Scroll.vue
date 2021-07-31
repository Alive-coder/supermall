<!-- 对于滚动的封装 -->
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
      type: Number,
      default: 0
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
      this.scroll.scrollTo(x, y, time)
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
        probeType: this.probeType
      })
    // 实时监听滚动位置
      this.scroll.on('scroll', (position) => {
        // console.log(position)  需要将 position 对象传出去(自定义事件)
        this.$emit('scroll', position)
      })

  },

}

</script>
<style scoped>
</style>