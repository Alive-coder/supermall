<!-- 显示弹窗 -->
<template>
  <div class="toast" v-show="isShow">
      {{massage}}
  </div>
</template>

<script>
export default {
  name: 'Toast',
  data () {
    return {
    }
  },
  methods: {
    //   第一个参数是显示内容，第二个参数是显示时间
      show(massage='默认文字', duration='1500'){
          this.massage = massage
          this.isShow = true

          setTimeout(() => {
              this.massage = ''
              this.isShow = false
          }, duration);
      }
  },
  props: {
  },
  data() {
      return {
          massage: '',
          isShow: false
      }
  },
}

</script>
<style scoped>
    .toast{
        background-color: rgba(0, 0, 0, .7);
        color: #fff;
        padding: 8px 10px;
        
        z-index: 999;

        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
</style>