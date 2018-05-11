<template>
  <scroller>
    <div class="housingDetail"><!--门店详情-->
      <section class="picWrap">
        <img src="../../assets/images/home/a.jpeg" alt="详情" width="100%" height="240px">
        <i class="el-icon-arrow-left iconLeft circle" @click="goBack()"></i>
        <i class="el-icon-more iconRight circle"></i>
        <p class="tipWrap"><span>健身区</span><span>影音区</span><span>台球室</span><span>休闲区</span><span>保安室</span><span>房间</span></p>
      </section>
      <div class="contentWrap">
        <div class="addressWrap">
          <p>
            <span class="bigFont">{{dataTest.name}}</span>
            <span class="rightBar">全部在租房源<i class="el-icon-arrow-right"></i></span>
          </p>
          <span>{{dataTest.address}}</span>
        </div>
        <section class="subarea">
          <i class="titleLine"></i><span class="title">优质服务</span>
          <p v-for="item in servicesList"><i class="dot"></i><span>{{item}}</span></p>
        </section>
        <section class="subarea">
          <i class="titleLine"></i><span class="title">周边配套</span>
          <div class="amap-page-container">
            <el-amap vid="amapDemo" class="amap-demo"
                     :zoom="zoom"
                     :center="mapCenter"
                     :plugin="plugin">
              <el-amap-marker v-for="marker in marker.position"
                              :key="marker.position"
                              :position="marker"
                              :visible="marker.visible"
                              :draggable="marker.draggable"></el-amap-marker>
            </el-amap>
          </div>
          <el-menu class="el-menu nearby" mode="horizontal" default-active="0" active-text-color="#ff6600">
            <el-menu-item class="el-menu-item" index="0" >交通</el-menu-item>
            <el-menu-item class="el-menu-item" index="1">教育</el-menu-item>
            <el-menu-item class="el-menu-item" index="2">医院</el-menu-item>
            <el-menu-item class="el-menu-item" index="3">银行</el-menu-item>
            <el-menu-item class="el-menu-item" index="4">餐饮</el-menu-item>
            <el-menu-item class="el-menu-item" index="5">商超</el-menu-item>
          </el-menu>
        </section>
        <section class="subarea">
          <i class="titleLine"></i><span class="title">房型简介</span>
          <div class="introduce">
            <img src="../../assets/images/home/a.jpeg" alt="详情" width="70%" height="100px">
          </div>
          <el-menu class="el-menu" mode="horizontal" default-active="0" active-text-color="#ff6600">
            <el-menu-item class="el-menu-item" index="0" >A</el-menu-item>
            <el-menu-item class="el-menu-item" index="1">B</el-menu-item>
            <el-menu-item class="el-menu-item" index="2">C</el-menu-item>
          </el-menu>
          <div class="introduceDetail" @click="goHousingType()">
            <div class="introducePic"><img src="../../assets/images/home/a.jpeg" alt="图片" width="100px" height="80px"></div>
            <div class="introduceText">
              <span>A：loft</span>
              <span class="price">￥900~2500</span>
              <button>可预订</button>
            </div>
          </div>
        </section>
      </div>
      <Divider>我是有底线的</Divider>
      <el-row class="el-row" type=flex >
        <el-col :span="12"><el-button style="width: 100%;border-radius: 0;border:none" type="primary" icon="el-icon-phone">联系管家</el-button></el-col>
        <el-col :span="12"><el-button style="width: 100%;border-radius: 0;background:#ff6600;border:none" type="primary" >预约看房</el-button></el-col>
      </el-row>
    </div>
  </scroller>

</template>

<script>
  import { Divider } from 'vux'

  export default {
    name: 'housingDetail',
    components: { Divider},
    data() {
      return {
        dataTest:"",
        servicesList:["智能门锁","24H快递柜","450平方米免费公共区域","免费联通光纤入户"],
        zoom: 15,
        mapCenter: [121.156468,31.167962],
        plugin: {
          pName: 'Scale',
          events: {
            init (instance) {
//              console.log(instance)
            }
          }
        },
        marker: {
          position: [[121.156468,31.167962],],
          visible: true,
          draggable: true
        },
      }
    },
    methods: {
      goBack(){
        let vm = this;
        vm.$router.forwardPage();
      },
      goHousingType(){
        let vm = this;
        vm.$router.pushPage({name:"housingType",
          params:{
            data:""
          }
        });
      },
    },
    mounted() {
      this.dataTest = this.$route.query.data;
      console.log("怎么啥都没有",this.dataTest)
    }
  }

</script>

<style type="text/scss" lang="scss" rel="stylesheet/scss">
.housingDetail{
  text-align:left;
  height:100%;
  .picWrap{
    position:relative;
    .circle{
      display:inline-block;
      width:30px;
      height:30px;
      text-align:center;
      line-height:30px;
      background:rgba(0,0,0,.2);
      position:absolute;
      top:10px;
      border-radius:50%;
    }
    .iconLeft{
      left:20px;
    }
    .iconRight{
      right:20px;
    }
    .tipWrap{
      position:absolute;
      bottom:15px;
      width:100%;
      left:15px;
      span{
        display:inline-block;
        padding:5px;
        margin:3px;
        background:rgba(0,0,0,.3);
        color:#fff;
        font-size:14px
      }
    }
  }
  .contentWrap{
    padding:10px;
    .addressWrap{
      padding:5px;
      border-bottom:1px solid #ddd;
      font-size:14px;
      p{
        margin-bottom:10px;
      }
      .bigFont{
        font-size:16px;
        font-weight:900;
      }
      .rightBar{
        float:right;
        margin:5px 0;
        color:#c9a05b;
      }
    }
    .titleLine{
      display:inline-block;
      width:5px;
      height:20px;
      background:#aaa;
      margin:20px 10px 0 0;
      vertical-align: sub;
    }
    .title{
      color:#aaa;
    }
    .amap-page-container {
      height: 200px;
      margin:10px;
    }
    .subarea{
      border-bottom:1px solid #ddd;
      .dot{
        display:inline-block;
        width:6px;
        height:6px;
        background:#666;
        border-radius:50%;
        margin-right:10px;
        vertical-align: middle;
      }
      p{
        margin:10px 0;
      }
      .introduce{
        img{
          width:70%;
          height:120px;
          margin:10px 15%;
        }
      }
      .el-menu{
        display:flex;
        .el-menu-item{
          flex:1;
          text-align:center;
          margin:0 30px;
        }
      }
      .nearby{
        .el-menu-item{
          margin:0;
          padding:0;
        }
      }
      .introduceDetail{
        padding:10px;
        display:flex;
        .introducePic{
          flex:2;
        }
        .introduceText{
          flex:8;
          margin-left:10px;
          span{
            display:block;
            margin-bottom: 10px;
          }
          span.price{
            color:#ff6600;
          }
          button{
            display:block;
            width: 75px;
            height: 20px;
            font-size: 13px;
          }
        }
      }
    }
    .subarea:last-child{
      border-bottom:none;
    }
  }

}
</style>
