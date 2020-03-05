<template>
  <!-- 使用el-card组件 -->
  <el-card>
    <!-- 使用面包屑组件 -->
    <!-- 面包屑加el-card的具名插槽 -->
    <bread-crumb slot="header">
      <!-- 填具名插槽的坑 -->
      <template slot="title">评论管理</template>
    </bread-crumb>
    <!-- 表格组件 -->
    <el-table :data="list">
      <!-- 表格的列 el-table-column -->
      <!-- prop表示显示的字段 -->
      <!-- label表示列的名称 -->
      <el-table-column prop="title" width="500" label="标题"></el-table-column>
      <!-- 给 el-table-column  一个formatter属性 用来格式化内容-->
      <el-table-column :formatter="formatterBool" prop="comment_status" label="评论状态"></el-table-column>
      <el-table-column prop="total_comment_count" label="评论总数"></el-table-column>
      <el-table-column prop="fans_comment_count" label="粉丝评论数"></el-table-column>
      <el-table-column prop label="操作">
          <!-- el-table-column组件 在插槽中传出了 row $index store column -->
          <!-- 插槽 -> 作用域插槽 ->子组件中的数据 通过插槽传出 slot-scope接收  row(行数据) $index(索引)  -->
      <template slot-scope="obj">
          <el-button size="small" type="text">修改</el-button>
        <!-- 根据评论状态决定显示隐藏 -->
         <el-button @click="openOrclose(obj.row)" size="small" type="text">{{obj.row.comment_status?'关闭':'打开'}}评论</el-button>
      </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      list: []
    }
  },

  methods: {
    // 获取评论数据
    getComment () {
      this.$axios({
        url: '/articles', // 请求地址
        params: {
          response_type: 'comment' // 此参数用来控制获取数据类型
        }
      }).then(result => {
        this.list = result.data.results
      })
    },
    formatterBool (row, column, cellValue, index) {
      // row代表当前的一行数据
      // column代表当前列的信息
      // cellValue 代表当前单元格的值
      // index 代表当前索引
      // 该函数需要返回值
      // 根据formatter布尔值显示是打开还是关闭
      return cellValue ? '正常' : '关闭'
    },
    // 实现打开还是关闭评论
    openOrclose (row) {
      const mess = row.comment_status ? '关闭' : '打开'
      this.$confirm(`是否${mess}评论`, '提示').then(() => {
        // 点击确定进入then
        // 调用axios打开或关闭接口
        this.$axios({
          url: '/comments/status',
          method: 'put', // 请求类型
          params: {
            article_id: row.id// 文章id
          },
          data: {
            allow_comment: !row.comment_status // 是打开还是关闭
          }
        }).then(() => {
          // 成功 提示消息 重新拉取数据
          this.$message.success(`${mess}评论成功`)
          // 重新拉取数据
          this.getComment()
        }).catch(() => {
          // 表示失败 进入catch
          this.$message.error(`${mess}评论失败`)
        })
      })
    }
  },
  created () {
    // 在钩子函数中直接获取数据
    this.getComment()
  }
}
</script>

<style>
</style>
