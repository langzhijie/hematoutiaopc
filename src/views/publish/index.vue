<template>
  <!--   这个是素材管理的组件 -->
  <!-- 用el-card布局 -->
  <el-card>
    <!-- 放置面包屑 具名header -->
    <bread-crumb slot="header">
      <!-- 填具名插槽的坑 -->
      <template slot="title">发布文章</template>
    </bread-crumb>
    <!-- 表单 -->
    <!-- label-width="100px" 设置标题宽度 -->
    <el-form
      style="margin-left:50px"
      label-width="100px"
      :model="publishForm"
      :rules="publishRules"
      ref="myForm"
    >
      <!-- 表单行 -->
      <el-form-item label="标题" prop="title">
        <el-input v-model="publishForm.title" placeholder="请输入标题" style="width:50%"></el-input>
      </el-form-item>
      <el-form-item label="内容" prop="conent">
        <el-input v-model="publishForm.conent" placeholder="请输入内容" type="textarea" :row="4"></el-input>
      </el-form-item>
      <el-form-item label="封面" prop="cover">
        <!-- 单选框组 -->
        <el-radio-group v-model="publishForm.cover.type">
          <!-- 单选选项 -->
          <!-- 需要给el-radio加上label属性 -->
          <el-radio :label="1">单图</el-radio>
          <el-radio :label="3">三图</el-radio>
          <el-radio :label="0">无图</el-radio>
          <el-radio :label="-1">自动</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="频道" prop="channel_id">
        <!-- 下拉列表 -->

        <el-select placeholder="请选择频道" v-model="publishForm. channel_id">
          <!-- 下拉选项 v-for 循环生成 el-option-->
          <!-- label 显示值  value 保存值 -->
          <el-option v-for="item in channels" :label="item.name" :value="item.id" :key="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <!-- 两个按钮 -->
        <el-button type="primary" @click="publish">发布</el-button>
        <el-button>存入草稿</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      channels: [], // 接收频道数据

      publishForm: {
        title: '', // 文章标题
        conent: '', // 文章 正文
        cover: {
          type: 0, // -1是自动 0是无图 1是单图  3是三图
          images: [] // 字符串对应type type是1 images中有一个值
        },
        channel_id: null // 表示没有任何频道

      },
      // 发布的校验规则
      publishRules: {
        //   trigger:blur 鼠标离开输入框在校验 默认是change 一改变就校验
        // min 最小最符串格式/最小整数个数 max 最大
        title: [{ required: true, message: '文章标题不能为空', trigger: 'blur' }, { min: 5, max: 30, message: '标题字符个数不在规定范围', trigger: 'blur' }],
        conent: [{ required: true, message: '文章内容不能为空', trigger: 'blur' }],
        channel_id: [{ required: true, message: '文章频道不能为空', trigger: 'blur' }]
      }
    }
  },
  methods: {
    //   手动检验事件
    publish () {
      // 用ref获取from实例 调用validate方法
      this.$refs.myForm.validate()
    },
    // 获取频道数据
    getChannels () {
      this.$axios({
        url: '/channels' // 获取频道数据
      }).then(result => {
        this.channels = result.data.channels // 将频道数据赋值给本地数据
      })
    }
  },
  created () {
    // 调用获取频道数据的方法
    this.getChannels()
  }
}
</script>

<style>
</style>
