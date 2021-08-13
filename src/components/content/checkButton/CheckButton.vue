<!-- 在购物车中的 选中 组件 -->
<template>
  <div class="button">
      <img src="~assets/img/cart/tick.svg" alt="" :class="{checked: isChecked}">
  </div>
</template>

<script>
export default {
  name: 'CheckButton',
  data () {
    return {
    }
  },
  props: {
      isChecked: {
          type: Boolean,
          default: false
      }
  },
  methods: {
  }
}

</script>
<style scoped>
    /* .check-button{
        border: 1px solid #aaa;
    } */

    .button img{
        border-radius: 50%;
        border: 2px solid #aaa;
    }
    .checked{
        /* border-color: red; */
        background-color: red;
        border: red solid 2px;
    }

</style>