<template>
  <div class="child-home">
    <div class="zoumadeng">
      <el-carousel height="200px" direction="vertical" :autoplay="false">
        <el-carousel-item v-for="item in list" :key="item">
         <img :src="item" alt="">
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      list: [
        'http://www.egouz.com/uploadfile/2016/0104/20160104122741324.jpg',
        'http://img8.zol.com.cn/bbs/upload/20418/20417146.jpg',
        'http://img5.hao123.com/data/desktop/2199629ebd1a2a48e17fc09990b9aacd_1366_768'
      ]
    }
  }
}
</script>

<style lang="less" scoped>
.child-home {
  // calc计算的意思 在css中计算数值 calc (四则运算)
  height: calc(100vh - 60px);

  .zoumadeng {
    height: 200px;
    width: 100%;

    img {
    width: 100%;
    height: 100%;
    }
  }
}
</style>
