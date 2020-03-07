<template>
  <el-card>
    <bread-crumb slot="header">
      <template slot="title">文章列表</template>
    </bread-crumb>
    <!-- 表单容器 -->
    <el-form style="margin-left:30px">

      <!-- 表单的第一行 -->
      <el-form-item label="文章状态:" >
          <!-- 单选框组 -->

        <el-radio-group v-model="searchForm.status">

            <!-- 单选框 -->
             <!-- 文章状态，0-草稿，1-待审核，2-审核通过，3-审核失败，不传为全部 / 先将 5 定义成 全部 -->
        <el-radio :label="5">全部</el-radio>
        <el-radio :label="0">草稿</el-radio>
        <el-radio :label="1">待审核</el-radio>
        <el-radio :label="2">审核通过</el-radio>
        <el-radio :label="3">审核失败</el-radio>
         </el-radio-group>
      </el-form-item>
      <!-- 表单的第二行 -->
      <el-form-item label="频道列表:">
          <!-- 下拉选择器 -->
           <el-select placeholder="请选择频道" v-model="searchForm.channel_id" >
               <!-- el-option是下拉选项 label是显示的值 value是绑定的值 -->
               <el-option v-for="item in channels" :key="item.id" :label="item.name" :value="item.id"></el-option>
           </el-select>
      </el-form-item>
      <!-- 表单的第三行 -->
      <el-form-item label="时间选择:">
          <!-- 日期选择器 -->
                <!-- 日期范围选择组件  要设置type属性为 daterange-->
          <el-date-picker type='daterange' v-model="searchForm.dateRange"></el-date-picker>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      searchForm: {
        // 数据
        // 文章状态，0-草稿，1-待审核，2-审核通过，3-审核失败，4-已删除，不传为全部 / 先将 5 定义成 全部
        // 传值的是时候如果是5 就不传
        status: 5, // 默认为全部的状态
        channel_id: null, // 表示没有任何频道
        dateRange: [] // 日期范围
      },
      channels: []// 放请求回来的数据 频道

    }
  },
  methods: {
    // 获取频道数据
    getChannels () {
      this.$axios({
        url: '/channels' // 获取文章列表的地址

      }).then(res => {
        this.channels = res.data.channels // 将获取的数据赋值给绑定的变量
      })
    }
  },
  created () {
    this.getChannels() // 加载完调用获取数据
  }
}
</script>

<style>

</style>
