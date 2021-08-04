<!-- detail 中的导航栏 -->
<template>
  <div>
      <nav-bar>
          <div slot="left" class="back" @click="backClick">
              <img src="~assets/img/common/back.svg" alt="">
          </div>
          <div slot="center" class="title">
              <div v-for="(item, index) in titles" 
                   class="title-item"
                   :class="{active: currentIndex === index}"
                   @click="itemClick(index)">
                  {{item}}
              </div>
          </div>
      </nav-bar>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'

export default {
  name: 'DetailNavBar',
  data () {
    return {
        titles: ['商品', '参数','评论','推荐'],
        currentIndex: 0
    }
  },
  components: {
      NavBar
  },
  methods: {
    //   需要将参数传递过来
      itemClick(index){
          this.currentIndex = index
      },
    //   回退按钮
      backClick(){
          this.$router.back()
      }
  }
}

</script>
<style scoped>
    .title{
        display: flex;
        font-size: 14px;
    }
    .title-item {
        flex: 1;
    }
    .active{
        color: var(--color-high-text);
    }
    .back img{
        margin-top: 12px;
        width: 18px;
    }

</style>