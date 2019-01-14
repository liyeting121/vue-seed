<template>
  <div class="home">
   <top-normal-bar normalTitle="srm评分管理" @goBack="goBack"></top-normal-bar>
    <section>
      <span class="title">工作列表</span>
      <div class="list-wrap">
        <div class="list-item" @click="goManage">考察评分管理</div>
        <div class="list-item" @click="goManage">履约评分管理</div>
      </div>
    </section>
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
      goManage(){
        this.$router.pushPage({
          name: 'inspectManage',
          query: {}
        });
      },

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
