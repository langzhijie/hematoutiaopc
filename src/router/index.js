import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/home'
import Login from '@/views/login'
import ChildHome from '@/views/home/child-home' // 引入二级路由组件
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    // 配置二级路由表
    children: [
      {
        path: '', // 二级路由地址 不写就默认为/home 要是写就会形成拼接 /home/XXX
        component: ChildHome
      },
      {
        // 配置评论列表路由
        path: 'comment', // 评论地址
        component: () => import('@/views/comment')/// / 按需加载 组件
      },
      {
        // 素材管理的路由表
        path: 'material', // 素材管理地址
        component: () => import('@/views/material') // 按需加载组件
      }

    ]
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  }

  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  routes
})

export default router
