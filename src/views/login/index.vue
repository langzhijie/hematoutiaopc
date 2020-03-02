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
      <el-form style=" margin-top:20px">
        <!-- 第一行表单域 -->
        <el-form-item>
          <el-input placeholder="请输入您的手机号"></el-input>
        </el-form-item>
        <!-- 第二行表单域 -->
        <el-form-item>
          <el-input style="width:60%" placeholder="请输入您的验证码"></el-input>
          <!-- 验证码按钮 -->
          <el-button style="float:right;">发送验证码</el-button>
        </el-form-item>
        <!-- 第三行表单域 -->
        <el-form-item>
          <el-checkbox>您已完整阅读该协议并且同意</el-checkbox>
        </el-form-item>
        <!-- 登录按钮 -->
        <el-form-item>
          <el-button style="width:100%" type="primary" round>登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {}
</script>

<style lang="less" scoped>
// 加scoped 表示只对当前组件生效
//加lang="less"表示css用less写
.login {
  background-image: url('../../assets/img/newbac.jpg');
  height: 100vh; //把可见屏幕的区域分成100份
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  .login-card {
    width: 440px;
    height: 340px;
    .login-img {
      text-align: center;
      img {
        height: 40px;
      }
    }
  }
}
</style>
