<!-- 回到顶部 -->
<template>
  <div class="back-top">
      <img src="~assets/img/common/top.png" alt="">
  </div>
</template>

<script>
export default {
  name: 'BackTop',
  data () {
    return {
    }
  },
  methods: {}
}

</script>
<style scoped>
    .back-top{
        position: fixed;
        right: 6px;
        bottom: 50px;
    }
    .back-top img{
        width: 60px;
        height: 60px;
    }
</style>