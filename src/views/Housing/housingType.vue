<template>
  <scroller>
    <div class="housingType"><!--门店详情-->
      <!--轮播-->
      <section class="picWrap">
        <swiper  :show-dots="false">
          <swiper-item :key="index" v-for="(item,index) in  bannerList">
            <span class="countBar">{{ index+1 }}/{{bannerList.length}}</span>
            <img  :src="item.img" alt="详情" width="100%" height="240px">
          </swiper-item>
        </swiper>
        <i class="el-icon-arrow-left iconLeft circle" @click="goBack()"></i>
        <i class="el-icon-more iconRight circle"></i>
      </section>
      <div class="contentWrap">
        <div class="titleWrap">
          <p>
            <span class="bigFont">{{housingDetailList.houseLayoutName}}</span>
          </p>
          <span>￥{{housingDetailList.rentalFrom}}~{{housingDetailList.rentalTo}}</span>
        </div>
        <!--户型介绍-->
        <section class="subarea">
          <i class="titleLine"></i><span class="title">户型介绍</span>
          <p :class="{'description':isRetract,'heightAuto':!isRetract}"><span class="line30">{{housingDetailList.description}}</span></p>
          <el-button type="info" class="widthAll" @click="more" v-if="isRetract">查看更多</el-button>
          <el-button type="info" class="widthAll" @click="more" v-if="!isRetract">收起</el-button>
        </section>
        <!--房型配套-->
        <section class="subarea">
          <i class="titleLine"></i><span class="title">房型配套</span>
          <div class="introduce">
            <img :src="housingDetailList.roomLayoutVos[0].pictures[0].previewUrl" alt="户型图" width="70%" height="100px">
          </div>
          <div class="introduceDetail">
            <div class="introduceWrap" v-for="item in housingDetailList.assetClasses">
              <img :src="item.iconUrl" alt="icon" width="30px" height="30px">
              <span class="introduceText">{{item.assetClassName}}</span>
            </div>
          </div>
        </section>
        <!--在租房源-->
        <section class="subarea houseSource">
          <i class="titleLine"></i><span class="title">在租房源</span>
          <div v-for="item in housingSourceList">
            <el-row class="el-row" type=flex  justify ="space-between">
              <el-col :span="6"><div>{{item.houseNumber}}</div></el-col>
              <el-col :span="6" style="text-align:right"><div>￥{{item.rentalAmount}}/月</div></el-col>
            </el-row>
            <el-row class="el-row" type=flex  justify ="space-between">
              <el-col :span="12"><div>{{item.houseArea}}㎡-{{item.floor}}层-朝南</div></el-col>
              <!--<el-col :span="12" style="text-align:right"><el-button style="height: 30px;line-height: 3px;">预定</el-button></el-col>-->
            </el-row>
          </div>
        </section>
      </div>
      <Divider>我是有底线的</Divider>
      <el-row class="el-row" type=flex >
        <!--<el-col :span="12"><el-button style="width: 100%;border-radius: 0;border:none" type="primary" icon="el-icon-phone">联系管家</el-button></el-col>-->
        <el-col :span="24" ><el-button @click="goLogin"style="width: 100%;border-radius: 0;background:#ff6600;border:none" type="primary" >预约看房</el-button></el-col>
      </el-row>
    </div>
  </scroller>
</template>

<script>
  import { Divider,Swiper } from 'vux'
  import SwiperItem from "../../../node_modules/vux/src/components/swiper/swiper-item";

  export default {
    name: 'housingType',
    components: {
      SwiperItem,
      Divider ,Swiper},
    data() {
      return {
        housingDetailList:"",
        bannerList:[],
        housingSourceList:"",
        projectId:"",
        houseLayoutId:"",
        isRetract:true,
      }
    },
    methods: {
      goBack(){
        let vm = this;
        vm.$router.forwardPage();
      },
      goLogin(){
        let vm = this;
        vm.$router.pushPage({name:"login",
          /*query:{
           data:item,
           }*/
        });
      },
      getHousingDetailList(param){//获取户型详情
        const url = $config.baseURL+`api/public/app/house/layout/queryDetail `;
        $axios
          .post(url,{"houseLayoutId":124})
          .then(res => {
            // 注意：res即为response.data，不再需要进行response.data.success判断
            console.log(res);
            this.housingDetailList = res.data.result;
            this.houseLayoutId =  this.housingDetailList.houseLayoutId;
            for(let i=0;i<this.housingDetailList.roomLayoutVos.length;i++){
              this.bannerList.push({"img":this.housingDetailList.roomLayoutVos[i].pictures[0].previewUrl})
            }
            console.log("轮播列表",this.bannerList)
            console.log("户型详情列表",this.housingDetailList)
          })
          .catch(err => {
            // 所有error情况统一在此处理，包括返回状态码为200，但response.data.success为false的情况
            console.log(err);
          });
      },
      getHousingSourceList(param){//查看在租房源
        const url = $config.baseURL+`api/public/app/house/query`;
        $axios
          .post(url,{"houseLayoutId":138})
          .then(res => {
            // 注意：res即为response.data，不再需要进行response.data.success判断
            console.log(res);
            this.housingSourceList = res.data.houses;
          })
          .catch(err => {
            // 所有error情况统一在此处理，包括返回状态码为200，但response.data.success为false的情况
            console.log(err);
          });
      },
      more(){
        this.isRetract = !this.isRetract;
      },
    },
    mounted() {
      this.projectId =this.$route.query.data;
      console.log("从户型列表传过来的",this.$route.query.data);
      this.getHousingDetailList();
      this.getHousingSourceList();
    }
  }

</script>


<style type="text/scss" lang="scss" rel="stylesheet/scss" scoped>
  .housingType{
    text-align:left;
    height:100%;
    .picWrap{
      position:relative;
      .countBar{
        position: absolute;
        left: 50%;
        bottom: 10px;
        z-index: 999;
        background: rgba(0,0,0,.4);
        padding: 2px 10px;
        border-radius: 10px;
        color:#fff;
        margin-left:-21px;
      }
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
        z-index:999;
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
    .contentWrap {
      padding: 10px;
      .titleWrap {
        padding: 5px;
        border-bottom: 1px solid #ddd;
        font-size: 14px;
        p {
          margin-bottom: 10px;
        }
        .bigFont {
          font-size: 16px;
          font-weight: 900;
        }
        .rightBar {
          float: right;
          margin: 5px 0;
          color: #c9a05b;
        }
      }
      .titleLine {
        display: inline-block;
        width: 5px;
        height: 20px;
        background: #caa25f;
        margin: 20px 10px 0 0;
        vertical-align: sub;
      }
      .title {
        color: #aaa;
      }
      .subarea {
        p {
          margin: 10px 0;
        }
        .description{
          height:150px;
        }
        .heightAuto{
          height:auto;
        }
        .line30{
          line-height:30px;
        }
        .widthAll{
          width:100%;
        }
        .introduce{
          img{
            width:70%;
            height: 240px;
            margin: 10px 15%;
          }
        }
        .introduceDetail{
          width:100%;
          display:flex;
          flex-wrap: wrap;
          align-items: center;
          box-shadow: 1px 0 1px 1px #ebddc4;
          border-radius: 3px;
          .introduceWrap{
            flex:1;
            flex-basis:20%;
            flex-grow:0;
            text-align:center;
            height: 100px;
            padding: 20px 0;
            .introduceText{
              display: block;
              font-size:12px;
              margin:5px 0 0;
            }
          }
        }
        .el-row{
          margin:20px 0;
        }
      }
      .houseSource>div{
        border-bottom:1px solid #ddd;
      }
    }
  }
</style>
