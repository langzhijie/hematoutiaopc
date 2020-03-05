<template>
  <!-- el-row是行 col是行  layout布局默认布局为24份-->
  <el-row align="middle" type="flex" class="layout-header">
    <el-col :span="12" class="left-col">
      <i class="el-icon-s-grid"></i>
      <span>江苏传智博客教育科技股份有限公司</span>
    </el-col>
    <el-col :span="12" class="right-col">
      <!-- 在右面12份中再加上个行设置在结尾显示 -->
      <!-- align设置垂直对齐方式  justufy设置水平对齐方式-->
      <el-row type="flex" justify="end" align="middle">
        <img :src="userInfo.photo" alt />
        <!-- 下拉菜单 -->
        <!-- trigger 切换下拉列表触发方式 click 和 hover -->
        <el-dropdown trigger="click" @command="clickmune">
          <span class="el-dropdown-link">
          {{userInfo.name}}
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <!-- 下拉菜单 下拉列表 -->
          <!-- el-dropdown-menu 专门做下拉列表的 -->
            <el-dropdown-menu slot="dropdown" >
              <!--  el-dropdown-item 是做下拉选项的组件 -->
              <el-dropdown-item command="info">个人信息</el-dropdown-item>
              <el-dropdown-item command="git">git地址</el-dropdown-item>
              <el-dropdown-item command="out">退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>

      </el-row>
    </el-col>
  </el-row>
</template>

<script>
export default {
  data () {
    return {
      // 个人信息
      userInfo: {

      }
    }
  },
  methods: {
    clickmune (command) {
      if (command === 'info') {
        // 点击个人信息
        alert(1)
      } else if (command === 'git') {
        // 点击git地址跳转到github
        window.location.href = 'https://github.com/langzhijie/hematoutiaopc'
      } else {
        // 点击退出 1.删除token令牌 2.跳转到登录页面
        localStorage.removeItem('user-token')
        this.$router.push('/login')
      }
    }

  },

  created () {
    //   获取用户的个人信息
    this.$axios({
      url: '/user/profile'// 请求地址
    }).then(result => {
      // 如果加载成功了 我们要将数据赋值给 userInfo
      this.userInfo = result.data
    })
  }
}
</script>

<style lang="less" scoped>
.layout-header {
  height: 60px;
  .left-col {
    i {
      font-size: 20px;
    }
  }
  .right-col {
    img {
      margin-right: 5px;
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }
  }
}
</style>
