/* eslint-disable eqeqeq */
<template>
  <div class="login">
    <!-- 表单 -->
    <el-card class="login-card">
      <!-- 表单内容 -->
      <!-- 登录logo部分 -->
      <div class="login-img">
        <!-- 表头登录图片 -->
        <img src="../../assets/img/logo_index.png" alt />
      </div>
      <!-- 登录界面登录表单部分 -->
      <!-- 表单容器 -->
      <!-- 绑定model属性 绑定rules属性 -->
      <el-form ref="loginForm" :model="loginForm" :rules="loginRules" style="margin-top:20px">
        <!-- 第一行表单域 -->
        <!-- prop属性是要校验的字段名 -->
        <el-form-item prop="mobile">
          <!-- 双向绑定 -->
          <el-input v-model="loginForm.mobile" placeholder="请输入您的手机号"></el-input>
        </el-form-item>
        <!-- 第二行表单域 -->
        <el-form-item prop="code">
          <el-input  v-model="loginForm.code" style="width:60%" placeholder="请输入您的验证码"></el-input>
          <!-- 验证码按钮 -->
          <el-button style="float:right;">发送验证码</el-button>
        </el-form-item>
        <!-- 第三行表单域 -->
        <el-form-item prop="checked">
          <el-checkbox  v-model="loginForm.checked">您已完整阅读该协议并且同意</el-checkbox>
        </el-form-item>
        <!-- 登录按钮 -->
        <el-form-item>
          <el-button @click="login" style="width:100%" type="primary" >登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  // 定义表单数据对象 与标签双向绑定
  data () {
    return {
      // 登录表单的数据
      loginForm: {
        mobile: '', // 手机号
        code: '', // 验证码
        checked: false // checked按钮

      },
      // 表单的验证规则
      loginRules: {
        // 校验的字段名称
        // required是必填项校验 true必填
        // message 是提示信息
        //  pattern 选项是校验格式是否正确
        mobile: [{ required: true, message: '请您填写正确的手机号' }, { pattern: /^1[3|4|5|7|8][0-9]{9}$/, message: '请您填写正确格式的手机号' }], // 手机号的验证规则
        code: [{ required: true, message: '请您填写正确的验证码' }, { pattern: /^\d{6}/, message: '请您填写正确格式的验证码' }], // 验证码的验证规则
        checked: [{
          // 自定义校验
          validator: function (rule, value, callback) {
          // rule是当前的校验规则
          // value是当前的要校验的字段的值
          // calllback是一个回调函数 不论成功或者失败都要执行
          // 成功执行callback 失败执行 callback(new Error('错误信息'))
          // 我们认为 如果 value 为true 就表示 校验成功 如果value 为false就表示校验失败
            // new Error(错误信息) 就是我们提示的错误信息
            value ? callback() : callback(new Error('您必须同意服务条款'))
          }
        }] // 是否勾选协议的验证规则

      }
    }
  },
  methods: {
    login () {
      // 第一种方法 通过回调函数

      // this.$refs.loginForm.validate(function (isOk) {
      //   if (isOk) {
      //     console.log('校验成功')
      //   } else {
      //     console.log('校验失败')
      //   }
      // })
      // this.$refs.loginForm就可以获取el - form对象的实例
      // 第二种通过then
      // 调用了el - form对象的实例中的手动校验
      this.$refs.loginForm.validate().then(() => {
        // 如果都校验成功则进入then
        console.log('校验成功')
        this.$axios({
          url: '/authorizations', // 请求地址
          // params:{}, //指url参数 拼接到url地址上的get的参数
          data: this.loginForm, // body的请求参数 常用于post/put/
          method: 'POST' // 请求类型 默认值是get类型 大小写都可以
        }).then(result => {
          // 成功 后将token进行存储
          console.log(result.data.data.token)
          // 讲token 进行本地存储
          window.localStorage.setItem('user-token', result.data.data.token)

          this.$router.push('/home') // 成功后进行跳转 push(可以是字符串也可以是对象)
        }).catch(() => {
          // 失败结果
          // this.$message({ message: '登录失败请查看手机号或验证码是否正确', type: 'error' })
          this.$message.error('登录失败请查看手机号或验证码是否正确')
        })
      })
    }
  }
}
</script>

<style lang="less" scoped>
// 加scoped 表示只对当前组件生效
//加lang="less"表示css用less写
.login {
  height: 100vh; //把可见屏幕的区域分成100份
  display: flex;
  justify-content: center;
  align-items: center;
  &:before {
    //&号是让伪类和login并列
    content: '00';
    height: 100%;
    width: 100%;
    position: absolute;
    background-image: url('../../assets/img/newbac.jpg');
    filter: blur(3px);
    background-size: cover;
  }
  .login-card {
    z-index: 2;
    width: 440px;
    height: 340px;
    background-color: rgba(0, 0, 0, 0);
    .login-img {
      text-align: center;
      img {
        height: 40px;
      }
    }
  }
}
</style>
