// 封装请求工具
// 对于axios的二次封装 配置拦截器及其他

// 引入
import axios from 'axios'
import router from '@/router' // 引入router模块
// 配置公共请求头地址
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0'
// 请求拦截器的设置
// 两个参数都是回调函数 成功执行第一个 失败执行第二个
axios.interceptors.request.use(function (config) {
  // 成功时 会有一个config 所有的axios的请求信息
//   需要将配置进行返回 返回的配置 会作为 请求参数进行请求
  const token = localStorage.getItem('user-token') // 缓存中取token
  config.headers.Authorization = `Bearer ${token}` // 同一注入token

  return config
}, function (error) {
  // 失败时会产生错误 直接可以reject错误
  return Promise.reject(error)
})

// 响应拦截器的开发
axios.interceptors.response.use(function (response) {
  // 回调函数第一个参数 是响应体
  // 在拦截器中 需要将数据返回  将数据进行解构
  return response.data ? response.data : {} // 有的接口 没有任何的响应数据
  // 成功的时候执行
}, function (error) {
//  error 是错误对象 里面包含了错误的状态码 和响应信息
// 如果 状态码是401 表示没拿钥匙或者是拿错钥匙 或者过期
// 应该回登录页从新拿钥匙 回登录页前要删除钥匙
// 判断状态码是不是401
  if (error.response.status === 401) {
    localStorage.removeItem('user-token')// 删除钥匙
    // 跳回登录页
    router.push('/login')
  }
  //   进行错误的处理
  return Promise.reject(error)
})

// 导出
export default axios
