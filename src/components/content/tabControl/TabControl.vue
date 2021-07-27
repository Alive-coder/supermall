<!-- 首页  分类 -->
<template>
  <div class="tab-control">
      <div v-for="(item, index) in title" 
       class="tab-control-item"
       :class="{active: index === currentIndex}"
       @click="itemClick(index)">
          <span>{{item}}</span>
      </div>
  </div>
</template>

<script>
export default {
  name: 'TabControl',
  data () {
    return {
        currentIndex: 0
    }
  },
  methods: {
    //   这里需要传入参数
      itemClick(index){
          this.currentIndex = index
            // 将数据传递给 home 外组件
          this.$emit('tabClick', index)
      }
  },
  props: {
      title: {
          type: Array,
          default(){
              return []
          }
      }
  }
}

</script>
<style scoped>
    .tab-control{
        display: flex;
        text-align: center;
        height: 40px;
        line-height: 40px;
        font-size: 15px;
        background-color: #fff;
    }
    .tab-control-item{
        flex: 1;
    }
    .active{
        color: var(--color-high-text);
    }
    .active span{
        border-bottom: 3px solid var(--color-tint); 
        padding: 3px;
    }
</style>