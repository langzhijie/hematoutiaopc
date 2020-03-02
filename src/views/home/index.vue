<template>
<!-- 最外层的大容器 -->
<el-container>
  <!-- 左边侧边栏容器 -->
  <el-aside>1</el-aside>
  <!-- 右边主要区域容器 -->
 <el-container>
   <!-- 右侧上部容器 -->
   <el-header>2</el-header>
   <!-- 右侧下部容器 -->
   <el-main>
     <h1>主要区域</h1>
     <!-- 二级路由容器 -->
     <router-view></router-view>
   </el-main>
 </el-container>
</el-container>
</template>

<script>
export default {}
</script>

<style>
</style>
