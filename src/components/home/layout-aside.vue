<template>
  <div class="latout-aside">
    <!-- 头部logo -->
    <div class="title">
      <img src="../../assets/img/logo_admin.png" alt />
    </div>
    <!-- 导航栏开始 -->
    <el-menu background-color="#323745" text-color="#adafb5" style="border-right:0">
      <!-- 不可展开的 -->
      <el-menu-item>
        <i class="el-icon-s-home"></i>
        <span>首页</span>
      </el-menu-item>
      <!-- 第二行 -->
      <!-- 二级菜单的容器 el-submenu -->
      <el-submenu>
        <template slot="title">
          <i class="el-icon-s-data"></i>
          <span>内容管理</span>
        </template>
        <el-menu-item>发布文章</el-menu-item>
        <el-menu-item>内容列表</el-menu-item>
        <el-menu-item>评论列表</el-menu-item>
        <el-menu-item>素材管理</el-menu-item>
      </el-submenu>
      <!-- 第三行 -->
      <el-submenu>
        <template slot="title">
          <i class="el-icon-attract"></i>
          <span>粉丝管理</span>
        </template>
        <el-menu-item>图文数据</el-menu-item>
        <el-menu-item>粉丝概况</el-menu-item>
        <el-menu-item>粉丝画像</el-menu-item>
        <el-menu-item>粉丝列表</el-menu-item>
      </el-submenu>

      <el-menu-item>
        <i class="el-icon-s-custom"></i>
        <span>账户信息</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {}
</script>

<style lang="less" scoped>
.latout-aside {
  background-color: #2e2f32;
  height: 100vh;
  width: 230px;
  .title {
    text-align: center;
    padding: 10px 0;

    img {
      height: 35px;
    }
  }
}
</style>
