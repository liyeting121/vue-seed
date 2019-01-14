<template>
  <div class="home">
   <top-normal-bar normalTitle="srm评分管理" @goBack="goBack"></top-normal-bar>
    履约评分
  </div>
</template>

<script>
import topNormalBar from '../components/commons/topNormalBar.vue'
export default {
    name: 'home',
    components: {topNormalBar},
    data() {
      return {}
    },
    methods: {
      goBack(){},
    },
    created(){

    },
    beforeRouteEnter(to,from,next){
      next((vm)=>{
        vm.$nextTick(() => {})
      });
    },
    mounted() {
    }
}
</script>


<style type="text/less" lang="less" rel="stylesheet/less">
  @import '../assets/less/common.less';
  .home{
    section{
    padding:10px 0;
    }
    .title{
      margin:10px;
    }
    .list-wrap{
      border:1px solid #ddd;
      background: #fff;
    }
    .list-item{
      padding:10px;
    }
    .list-item{
      border-bottom:1px solid #ddd;
    }
  }
</style>
