<template>
  <!-- 使用el-card组件 -->
  <!-- 加加载时的遮罩层 -->
  <el-card v-loading="loading">
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
    <!-- 分页器制做 -->
     <el-row type="flex" justify="center" align="middle" style="margin-top:20px">
       <!-- 分页器 layout属性里 prev上一页 pager当前页 next下一页 -->
       <!-- 分页器三要素 tital 总条数 current-page 当前页  page-size 每页显示的个数-->
       <!-- 分页器监听 @current-change事件监听页码改变 -->
       <el-pagination background layout="prev, pager, next"
        :total="page.total"
        :current-page="page.currentPage"
        :page-size ="page.pageSize"
        @current-change="ChangePage"></el-pagination>
     </el-row>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      list: [],
      page: {
        // 分别设置分页器的必要条件
        total: 0, // 总条数
        currentPage: 1, // 当前在第几页
        pageSize: 15// 每页显示几条数据

      },
      loading: false // 默认遮罩层关闭
    }
  },

  methods: {
    // 分页器监听事件
    ChangePage (newPage) {
      // 参数是新改变的页码赋值给旧页码
      this.page.currentPage = newPage
      // 从新拉取新页的数据
      this.getComment()
    },

    // 获取评论数据
    getComment () {
      // 获取评论数据参数可以不传页数默认请求的是第一页数据
      // 请求前打开遮罩层
      this.loading = true
      this.$axios({
        url: '/articles', // 请求地址
        params: {
          response_type: 'comment', // 此参数用来控制获取数据类型
          page: this.page.currentPage, // 查找当前对应页码的数据
          per_page: this.page.pageSize// 每页显示数量 10-50之间
        }
      }).then(result => {
        // 返回的数据给数组list
        this.list = result.data.results
        this.page.total = result.data.total_count // 将总数赋值给page中
        this.loading = false // 请求完毕关闭遮罩层
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
          method: 'PUT', // 请求类型
          params: {
            article_id: row.id.toString()// 需要将BigNumber类型转成字符串 只要保证前端的字符串和后端id对上就行
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
