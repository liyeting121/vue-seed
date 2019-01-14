<template>
  <div class="top-select-bar">
    <header class="whiteBg">
      <i class="el-icon-arrow-left" @click="goBack"></i>
      <el-menu class="el-menu" mode="horizontal"
               :default-active="activeIndex"
               :text-color="textColor"
               :active-text-color="activeTextColor"
               @select="handleSelect">
        <el-menu-item index="1" class="el-menu-item">{{firstOption}}</el-menu-item>
        <el-menu-item index="2" class="el-menu-item">{{secondOption}}</el-menu-item>
      </el-menu>
      <i class="el-icon-search barRight" v-if="showSearch" @click="search"></i>
      <span class="barRight"  v-if="showQuit" @click="quit">取消</span>
    </header>
  </div>
</template>

<script>
export default {
  name: 'topSelectBar',
  components: {},
  props: ["firstOption", 'secondOption', 'showSearch', 'showQuit' ,'state'],
  data() {
    return {
      activeIndex:"1",
      textColor:"#9D9D9D",
      activeTextColor:"#C9A05B",
      checkState:this.state,
    }
  },
  methods: {
    goBack(){//返回
      var vm = this;
      vm.$router.forwardPage();
      vm.$emit('goBack')
    },
    quit(){//取消
      this.$emit('quit');
    },
    search(){//搜索
      this.$emit('search')
    },
    handleSelect(key, keyPath) {
//      console.log(key,keyPath);
      this.$emit('handleSelect',key)
    }
  },
  mounted() {}
}
</script>

<style type="text/less" lang="less" rel="stylesheet/less">
.top-select-bar{
  .whiteBg{
    background:#fff;
  }
  .el-menu--horizontal>.el-menu-item.is-active{
    border-bottom-width: 3px;
  }
  .el-menu-item:focus, .el-menu-item:hover{
    background:none;
    -webkit-appearance: none;
    -webkit-tap-highlight-color: transparent;
  }
  header{
    height:60px;
    box-shadow:0 1px 1px 0 #DCDCDC;
    line-height:80px;
    display:flex;
    padding:0 5px 0 15px;
    margin-bottom:15px;
    i.el-icon-arrow-left{
      font-size:20px;
      vertical-align:middle;
      line-height: 80px;
      color:#000;
      font-weight:900;
      flex:1;
    }
    .el-menu{
      flex:8;
      text-align:center;
      height:61px;
      vertical-align: middle;
      -webkit-appearance: none;
      -webkit-tap-highlight-color: transparent;
      .el-menu-item{
        margin-left: 50px;
        padding:0 5px;
        height:61px;
        font-size:16px;
        font-weight:600;
        line-height:75px;
        -webkit-appearance: none;
        -webkit-tap-highlight-color: transparent;
      }
    }
    .barRight{
      flex:1;
      font-size:14px;
      color:#9d9d9d;
      line-height:75px;
    }
    i.el-icon-search{
      font-size:20px;
      -webkit-appearance: none;
      -webkit-tap-highlight-color: transparent;
      color:#333;
    }

  }
}
</style>
