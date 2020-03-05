
<template>
<!-- elementUI 面包屑组件 -->
<!-- separator="分隔符" -->
<el-breadcrumb  separator=">">
    <!-- <el-breadcrumb-item to="/home"> to属性相当于router-link的to -->
    <el-breadcrumb-item to="/home">首页</el-breadcrumb-item>
        <!-- 第二个选项是动态的 需要采用传值的方式传进来 props传值 slot插槽传值 -->
      <el-breadcrumb-item>
          <!-- 内容是动态的 -->
          <slot name="title"></slot>
      </el-breadcrumb-item>
</el-breadcrumb>
</template>

<script>
export default {

}
</script>

<style>

</style>
