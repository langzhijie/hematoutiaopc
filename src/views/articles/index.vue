<template>
  <el-card class="articles">
    <bread-crumb slot="header">
      <template slot="title">文章列表</template>
    </bread-crumb>
    <!-- 表单容器 -->
    <el-form style="margin-left:30px">
      <!-- 表单的第一行 -->
      <el-form-item label="文章状态:">
        <!-- 单选框组 -->
        <!-- 第一种方法 -->
        <!-- <el-radio-group v-model="searchForm.status" @change="changeCoundition"> -->
          <el-radio-group v-model="searchForm.status" >
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
          <!-- 第一种方法 -->
        <!-- <el-select placeholder="请选择频道" v-model="searchForm.channel_id" @change="changeCoundition"> -->
        <el-select placeholder="请选择频道" v-model="searchForm.channel_id">

          <!-- el-option是下拉选项 label是显示的值 value是绑定的值 -->
          <el-option v-for="item in channels" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <!-- 表单的第三行 -->
      <el-form-item label="时间选择:">
        <!-- 日期选择器 -->
        <!-- 日期范围选择组件  要设置type属性为 daterange-->
        <!--  value-format="yyyy-MM-dd" 设置绑定值得格式 -->
         <!-- 第一种方法 -->
        <!-- <el-date-picker type="daterange"  value-format="yyyy-MM-dd" v-model="searchForm.dateRange" @change="changeCoundition"></el-date-picker> -->
        <el-date-picker type="daterange"  value-format="yyyy-MM-dd" v-model="searchForm.dateRange" ></el-date-picker>

      </el-form-item>
    </el-form>
    <!-- 文章列表的主体 -->
    <el-row class="title" type="flexx" align="middle">
      <span>共找到10000条符合条件的内容</span>
    </el-row>
    <!-- 列表内容 -->
    <!-- toString 将大数字类型转成字符串 -->
    <div class="articles_item" v-for="item in  arrttcles_item" :key="item.id.toString()">
      <!-- 左侧 -->
      <div class="left">
        <img :src="item.cover.images.length?item.cover.images[0]:banImg" alt />
        <div class="info">
          <p>{{item.title}}</p>
          <el-tag class="tag" :type="item.status|filterType">{{item.status |filterStatus}}</el-tag>
          <p class="data">{{item.pubdate}}</p>
        </div>
      </div>
      <!-- 右侧 -->
      <div class="right">
        <span>
          <i class="el-icon-edit"></i>修改
        </span>
        <span @click="del_item(item.id.toString())">
          <i class="el-icon-delete"></i>删除
        </span>
      </div>
    </div>
    <!-- 分页 -->
   <el-row type="flex" justify="center" align="middle" style="height:80px">
     <!--   @current-change页码改变事件 -->
     <el-pagination backgound layout="prev,pager,next"
     :current-page="page.currentPage"
     :page-size="page.pageSize"
     :total="page.total"

        @current-change="changePage()"></el-pagination>
   </el-row>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      // 分页
      page: {
        currentPage: 1, // 当前页码
        pageSize: 10, // 每页显示几条
        total: 0 // 总条数
      },
      searchForm: {
        // 数据
        // 文章状态，0-草稿，1-待审核，2-审核通过，3-审核失败，4-已删除，不传为全部 / 先将 5 定义成 全部
        // 传值的是时候如果是5 就不传
        status: 5, // 默认为全部的状态
        channel_id: null, // 表示没有任何频道
        dateRange: [] // 日期范围
      },
      channels: [], // 放请求回来的数据 频道
      arrttcles_item: [], // 请求的文章列表数据
      banImg: require('../../assets/img/banzhuan.jpg') // 固定图片
    }
  },
  // 监听data中的数据变化  第二种解决方案  watch监听对象的深度检测方案
  watch: {
    searchForm: {
      deep: true, // 固定写法 表示 会深度检测searchForm中的数据变化
      // handler也是一个固定写法 一旦数据发生任何变化 就会触发 更新
      handler () {
        //  统一调用改变条件的 方法
        this.page.currentPage = 1 // 只要条件改变就将页码切换回1
        this.changeCoundition() // this 指向当前组件实例
      }
    }
  },
  // 专门处理状态的过滤器
  filters: {
    filterStatus (value) {
      // 文章状态 0-草稿，1-待审核，2-审核通过，3-审核失败，4-已删除
      switch (value) {
        case 0:
          return '草稿'
        case 1:
          return '待审核'
        case 2:
          return '以发表'
        case 3:
          return '审核失败'
      }
    },
    // 处理tag标签的type样式
    filterType (value) {
      switch (value) {
        case 0:
          return 'warning'// 草稿
        case 1:
          return 'info'// 待审核
        case 2:
          return ''// 以发表
        case 3:
          return 'danger'// 审核失败，4
      }
    }
  },
  methods: {
    // 删除草稿
    del_item (id) {
      this.$confirm('您确定要删除此信息吗?', '提示').then(() => {
        this.$axios({
          url: `/articles/${id}`, // 地址 是  /articles/:target target 是文章id
          method: 'delete'
        }).then(() => {
          this.changeCoundition() // 重新加载
        }).catch(() => {
          this.$message.error('删除文章失败')
        })
      })
    },
    // 监听页码改变事件
    changePage (newpage) {
      this.page.currentPage = newpage// 最新页码
      this.changeCoundition() // 从新拉取数据
    },
    changeCoundition () {
      // 进行筛选条件的拼装
      const params = {
        page: this.page.currentPage, // 如果条件改变 就回到第一页
        per_page: this.page.pageSize,
        // 文章状态，0-草稿，1-待审核，2-审核通过，3-审核失败，4-已删除，不传为全部
        status: this.searchForm.status === 5 ? null : this.searchForm.status, // 5 是我们前端虚构的
        channel_id: this.searchForm.channel_id, // 就是表单的数据
        begin_pubdate: this.searchForm.dateRange.length ? this.searchForm.dateRange[0] : null,
        end_pubdate: this.searchForm.dateRange.length > 1 ? this.searchForm.dateRange[1] : null
      }
      // 发请求
      this.getArtticles(params) // 带参数的请求获取文章列表
    },
    // 获取文章列表
    getArtticles (params) {
      this.$axios({
        url: '/articles', // 获取文章列表的地址
        params // 筛选条件进行查找文章列表
      }).then(res => {
        this.arrttcles_item = res.data.results // 获取文章列表
        this.page.total = res.data.total_count// 分页上总数赋值
      })
    },

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
    this.getArtticles() // 加载请求文章列表
  }
}
</script>

<style lang="less" scoped>
.articles {
  .title {
    font-weight: 600;
    height: 60px;
    border-bottom: 1px dashed #ccc;
  }
  .articles_item {
    display: flex;
    justify-content: space-between;
    padding: 20px 0;
    border-bottom: 1px solid #ccc;
    .left {
      display: flex;
      justify-content: space-between;
      img {
        width: 180px;
        height: 100px;
        border-radius: 4px;
      }
      .info {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        height: 100px;
        margin-left: 20px;
        .data {
          color: #999;
          font-size: 12px;
        }
        .tag {
          width: 60px;
          text-align: center;
        }
      }
    }
    .right {
      span {
        font-size: 12px;
        margin-left: 5px;
        cursor: pointer; //悬停有小手图标
        user-select: none; //选择不了
      }
    }
  }
}
</style>
