// 此文件专门处理路由权限问题
import router from '@/router'
// 注册全局的前置守卫
// 回调函数会在路由发生改变的时候执行
// next是一个必须执行的函数 不执行会死在函数里
// to是去哪 from是哪里来
// next()没有参数表示全部放过
// next(false) 当前跳转被禁止
// next(新地址) 表示改变原来轨迹 去一个新地方
router.beforeEach(function (to, from, next) {
  // 1.判断是不是从以home开头来的
  //   startsWith以什么开头的字符串
  if (to.path.startsWith('/home')) {
    //   3.拿本地存储的钥匙
    const token = window.localStorage.getItem('user-token')
    // 4.判断是否有钥匙如果有钥匙放过
    if (token) {
      next()// 有钥匙放过
    } else {
      // 没有钥匙只能在login页
      next('/login')
    }
  } else {
    next() // 2.不是从home来的其余都放过
  }
})
