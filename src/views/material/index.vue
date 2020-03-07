<template>
  <!--   这个是素材管理的组件 -->
  <!-- 用el-card布局 -->
  <el-card>
    <!-- 放置面包屑 具名header -->
    <bread-crumb slot="header">
      <!-- 填具名插槽的坑 -->
      <template slot="title">素材管理</template>
    </bread-crumb>
    <!-- 上传按钮 -->
     <el-row type='flex' justify="end">
          <!-- 上传组件要求必须传action属性 不传就会报错 可以给一个空字符串-->
          <el-upload :http-request="uploadImg" action="">
           <el-button size="small" type='primary'>上传素材</el-button>
           <!-- 传入一个内容 点击内容就会传出上传文件框 -->
            <div slot="tip" class="el-upload__tip">记录美好生活</div>
          </el-upload>
        </el-row>
    <!-- 放置标签页标签 -->
    <!-- v-model绑定值，选中选项卡的 name -->
    <el-tabs v-model="activeName" @tab-click="changeTab">
      <!-- 放置两个标签页 label属性显示名称 name代表页签中的值 -->
      <el-tab-pane label="全部素材" name="all">
        <!-- 页面结构的搭建 -->
        <div class="img_list">
          <el-card class="img_card" v-for="(item,index) in list" :key="item.id">
            <!-- 放置图片 并且赋值 图片地址-->
            <img :src="item.url" alt  @click="selectImg(index)"/>
            <!-- 操作栏 可以flex布局-->
            <el-row class="operate" type="flex" align="middle" justify="space-around">
              <i class="el-icon-star-on" @click="collectOrCancel(item)" :style="{color: item.is_collected ? 'red' : 'black'}"></i>
              <i class="el-icon-delete-solid" @click="delMaterial(item)" ></i>
            </el-row>
          </el-card>
        </div>
      </el-tab-pane>
      <el-tab-pane label="收藏素材" name="collect">
            <div class="img_list">
          <el-card class="img_card" v-for="(item, index) in list" :key="item.id">
            <!-- 放置图片 并且赋值 图片地址-->
            <img :src="item.url" alt   @click="selectImg(index)"/>

          </el-card>
        </div>
      </el-tab-pane>
    </el-tabs>
      <el-row type='flex' justify="center" style='height:80px' align="middle">
          <!-- 放置分页组件
            total  总条数
            current-page 当前页码
            page-size 每页多少条
          -->
          <el-pagination background
            :total="page.total"
            :current-page="page.currentPage"
            :page-size="page.pageSize"
            layout="prev, pager, next"
             @current-change="ChangePage"
          ></el-pagination>
    </el-row>
    <!-- 放置一个公共的el-dialog visible属性，它接收Boolean，当为true时显示 Dialog -->
    <!-- 通过监听close事件关闭弹窗 -->
   <el-dialog @opened="openEnd" :visible="dialogVisible" @close="dialogVisible = false">
     <!-- 添加走马灯组件 -->
      <el-carousel ref="myCarousel" indicator-position="outside" height="400px" >
         <el-carousel-item v-for="item in list" :key="item.id">
           <img style="width:100%;height:100%" :src="item.url" alt="">
         </el-carousel-item>
      </el-carousel>
   </el-dialog>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      activeName: 'all', // 当前激活的页签 默认选中全部素材
      list: [], // 全部素材的数据 接收全部素材 和收藏数据共用
      page: {
        total: 0, // 总条数
        currentPage: 1, // 当前在第几页
        pageSize: 15// 每页显示几条数据

      },
      dialogVisible: false, // 控制显示隐藏
      clickIndex: -1 // 点击的索引
    }
  },
  methods: {
    // 打开图片调用的方法
    openEnd () {
      // 打开对应的照片
      this.$refs.myCarousel.setActiveItem(this.clickIndex) // 尝试通过这种方式设置index
    },
    // 记录点击图片的下标
    selectImg (index) {
      this.clickIndex = index // 记录下选择的下标
      this.dialogVisible = true // 让弹窗显示出来
    },

    // 删除图片
    delMaterial (row) {
      // 删除前进行询问
      this.$confirm('您确定要删除该内容吗？').then(() => {
        // 询问之后调用删除的接口
        this.$axios({
          url: `/user/images/${row.id}`, // 删除请求地址
          method: 'DELETE' // delete类型

        }).then(() => {
          this.getMsg() // 成功后从新拉取数据
        })
      })
    },
    // 收藏图片
    collectOrCancel (row) {
      this.$axios({
        url: `/user/images/${row.id}`, // 添加收藏请求地址
        method: 'PUT', // put类型
        data: {
          collect: !row.is_collected // data参数 collect 取反表示
        }
      }).then(() => {
        // 成功
        this.getMsg() // 成功就从新拉取数据
      }).catch(() => {
        // 失败
        this.$message.error('操作失败')
      })
    },
    //   上传图片
    uploadImg (params) {
      const data = new FormData() // 实例化一个fordata对象
      data.append('image', params.file) // 加文件参数
      this.$axios({
        url: '/user/images', // 上传图片地址
        method: 'POST', // 请求方式
        data
      }).then(() => {
        //   成功时
        this.getMsg()
      }).catch(() => {
        this.$message.error('上传失败')
      })
    },
    //   分页器的实现
    ChangePage (newPage) {
      //   将当前点击的新页码赋值给currentPage
      this.page.currentPage = newPage
      //   从新拉取数据
      this.getMsg()
    },
    // 获取素材
    getMsg () {
      this.$axios({
        url: '/user/images', // 获取素材请求地址
        params: {
          collect: this.activeName === 'collect', //  这得写活 根据 activeName来决定请求谁this.activeName === 'collect' 要是true就是获取收藏的
          page: this.page.currentPage, // 查找当前对应页码的数据
          per_page: this.page.pageSize// 每页显示数量 10-50之间
          // query参数collect表示请求的是全部还是收藏
        },
        data: {} // data参数放body参数
      }).then(res => {
        // 成功后执行
        // console.log(res)
        // 将请求得到的数据复制给list
        this.list = res.data.results
        this.page.total = res.data.total_count
      })
    },
    //   切换页签的方法
    changeTab () {
      this.page.currentPage = 1 // 将页码重置为第一页 因为分类变了 数据变了
      // 根据activeName=all 还是等于collect 来决定点击时切换到哪里
      this.getMsg() // 调用拉取数据的方法
    }

  },
  created () {
    // 实例化之后 调用获取素材数据
    this.getMsg() // 获取素材数据
  }
}
</script>

<style lang="less" scoped>
.img_list {
  display: flex;
  flex-wrap: wrap; //换行
  justify-content: center; //居中
  .img_card {
    width: 200px;
    height: 180px;
    margin: 10px 10px;
    position: relative;
    img {
      width: 100%;
      height: 100%;
    }
   .operate {
              position: absolute;
              left:0;
              bottom:0;
              width: 100%;
              background: #f4f5f6;
              height: 30px;
              i  {
                  font-size:20px;
              }
          }
  }
}
</style>
