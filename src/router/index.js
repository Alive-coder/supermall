import Vue from "vue"
import VueRouter from "vue-router"


const Home = () => import('views/home/Home')
const Category = () => import('views/category/Category')
const Cart = () => import('views/cart/Cart')
const Profile = () => import('views/profile/Profile')

// 安装插件
Vue.use(VueRouter)

// 创建 router
// 配置映射关系
const routes = [
    {
        path: '',
        redirect: '/home'
      },
      {
        path: '/home',
        component: Home
      },
      {
        path: '/category',
        component: Category
      },
      {
        path: '/cart',
        component: Cart
      },
      {
        path: '/profile',
        component: Profile
      }
]

const router = new VueRouter({
    routes,
    // 设置  历史记录，设置历史记录时要主要要使用  ' '  号括起来
    mode: 'history'
})

// 导出
export default router