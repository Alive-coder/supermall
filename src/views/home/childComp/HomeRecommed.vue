<!-- 首页推荐 -->
<template>
  <div class="recommend">
      <div v-for="item in recommends" class="recommend-item">
            <a :href="item.link" >
                <img :src="item.image" alt="">
                <div class="title">{{item.title}}</div>
            </a>
      </div>
  </div>
</template>

<script>
export default {
  name: 'HomeRecommend',
  data () {
    return {
    }
  },
  methods: {},
  props: {
    recommends: {
        type: Array,
        default() {
          return []
        }
    }
  }
}

</script>
<style scoped>
    .recommend{
        width: 100%;
        display: flex;
        text-align: center;
        margin-top: 10px;
        padding-bottom: 25px;
        border-bottom: 8px solid #eee;
        font-size: 12px;
    }
    .recommend-item{
        flex: 1;
    }
    .recommend img {
        width: 70px;
        height: 70px;
    }
    .title{
        margin-top: 5px;
    }
</style>