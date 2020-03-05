// 需要使用 Vue.use的方式去注册 Vue.use会调用对象中的install方法
import LayoutHeader from './home/layout-header'
import LayoutAside from './home/layout-aside'
import BreadCrumb from './commom/bread-crumd'
export default {
  // 全局注册组件 Vue 在任意位置都可以使用组件
  install: function (Vue) {
    Vue.component('layout-header', LayoutHeader)// 头部组件
    Vue.component('layout-aside', LayoutAside) // 侧栏组件
    Vue.component('bread-crumb', BreadCrumb)// 面包屑组件
  }
}
