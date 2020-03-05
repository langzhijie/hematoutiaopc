<template>
<!-- 最外层的大容器 -->
<el-container>
  <!-- 左边侧边栏容器 -->
  <el-aside style="width:230px;background:#2e2f32">
    <layout-aside></layout-aside>
  </el-aside>
  <!-- 右边主要区域容器 -->
 <el-container>
   <!-- 右侧上部容器 -->
   <el-header>
     <layout-header></layout-header>
   </el-header>
   <!-- 右侧下部容器 -->
   <el-main style="padding:0">

     <!-- 二级路由容器 -->

     <router-view></router-view>
   </el-main>
 </el-container>
</el-container>
</template>

<script>

export default {
  components: {

  }
}
</script>

<style>
</style>
