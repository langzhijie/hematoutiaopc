import Vue from 'vue'
import App from './App.vue'
import router from './router'
import '@/permission' // 引入权限模块
import ElementUI from 'element-ui'// 引入element-ui
import axios from '@/utils/request.js' // 引入二次封装的axios
import Components from '@/components'
import 'element-ui/lib/theme-chalk/index.css'// 引入样式
import '@/styles/index.less'
Vue.config.productionTip = false
Vue.use(Components) // 全局注册自定义组件
Vue.use(ElementUI) // 全局注册element-ui一旦全局注册所有位置都能用

Vue.prototype.$axios = axios // 将asios赋值给Vue对象的原型属性 全局就可以 this.$axios使用
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
