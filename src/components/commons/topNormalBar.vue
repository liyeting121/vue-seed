<template>
  <div class="top-normal-bar">
    <header class="whiteBg">
      <i class="el-icon-arrow-left" @click="goBack()"></i>
      <h6><span>{{normalTitle}}</span></h6>
    </header>
  </div>
</template>

<script>
export default {
  name: 'topNormalBar',
  components: {},
  props: [ 'normalTitle' ],
  data() {
      return {}
  },
  methods: {
    goBack(){
      var vm = this;
      vm.$router.forwardPage();
      vm.$emit('goBack')
    },
  },
  mounted() {
  }
}
</script>


<style type="text/less" lang="less" rel="stylesheet/less">
.top-normal-bar{
  .whiteBg{
    background:#fff;
  }
  header {
    height: 64px;
    line-height:64px;
    box-shadow: 0 1px 1px 0 #DCDCDC;
    position:relative;
    margin-bottom:10px;
    padding-top:10px;
    i.el-icon-arrow-left {
      position:absolute;
      left:15px;
      top:50%;
      font-size: 20px;
      color: #000;
      font-weight: 900;
    }
    h6 {
      display: inline-block;
      font-size: 16px;
      text-align:center;
      width:100%;
      margin:0;
      padding:0;
      span{
        display:inline-block;
      }
    }
  }
}
</style>
