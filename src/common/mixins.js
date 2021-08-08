// 混入函数
import {debounce} from 'common/utils'

export const itemListenerMixin = {
    data() {
        return {
            // 记录离开页面时取消 监听图片加载完成
            itemImgLoad: null
        }
    },
    mounted() {
        // 防抖函数
      const refresh = debounce(this.$refs.scroll.refresh, 200)
      //    记录 itemImgLoad 函数
            this.itemImgLoad = () => {
              refresh()
            }
            this.$bus.$on('itemImageLoad', this.itemImgLoad)
           
    },
}