/*  在使用 toast 插件时，需要在 main.js  中先导入 index.js文件，再进行安装  Vue.use(toast)
 */

import Toast from './Toast'

const obj = {}

obj.install = function (Vue){
    // 1.创建组件构造器
    const toastContrustor = Vue.extend(Toast)

    // 2.创建组件对象
    const toast = new toastContrustor()

    // 3.将组件对象手动挂载到某个元素上,就在 DOM 上挂载了对应的元素对象
    toast.$mount(document.createElement('div'))

    // 4. 将 toast 对象的元素添加到 body 中
    document.body.appendChild(toast.$el)

    // 往 vue 原型上加入  $toast  对象
    Vue.prototype.$toast = toast
}

export default obj