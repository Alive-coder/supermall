// 混入函数
import {debounce} from 'common/utils'
import BackTop from 'components/content/backTop/BackTop'

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

// 回到顶部的抽取
//  使用：  <back-top  @click.native="backClick" v-show="isShowBackTop"/>
export const BackTopMixin = {
    data(){
        return {
            // 记录是否显示 回到顶部
            isShowBackTop: 'flase'
        }
    },
    components: {
        BackTop
    },
    methods: {
        // 点击回到顶部
        backClick(){
            this.$refs.scroll.scrollTo(0, 0)
        },
    },

}