<template>
  <div class="housingView">
    <x-header class="header" title="房屋查看" :left-options="{backText:null,preventGoBack:'true'}" @on-click-back="goBack()"></x-header>
    <!--头部筛选区显示列表-->
    <section class="selectWrap">
      <div class="menuFirst">
        <div class="selectMenu">
          <span>城市</span>
          <el-select class="selectBar"  v-model="cityName" placeholder="选择城市"  @change="cityChange" @visible-change="clearBoth">
            <el-option
              v-for="item in cityList"
              :key="item.cityName"
              :label="item.cityName"
              :value="item.cityName">
            </el-option>
          </el-select>
        </div>
        <div class="selectMenu">
          <span>行政区</span>
          <el-select class="selectBar"  v-model="districtName" placeholder="选择行政区" @change="districtChange" @visible-change="clearProject">
            <el-option
              v-for="item in districtList"
              :key="item.districtName"
              :label="item.districtName"
              :value="item.districtName">
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="selectMenu">
        <span>门店</span>
        <el-select class="selectBar"  v-model="projectId" placeholder="选择门店" @change="projectChange(projectId)">
          <el-option
            v-for="item in projectList"
            :key="item.projectName"
            :label="item.projectName"
            :value="item.projectId">
          </el-option>
        </el-select>
      </div>
    </section>
    <!--户型摘要显示列表-->
    <section class="housingListWrap">
      <div class="housingSum" @click="goHousingDetail(item)" v-for="(item,index) in housingSumList">
        <div class="housingPic smCon">
          <img :src="item.beroom.downUrl" alt="图片" width="100%" height="100px">
        </div>
        <div class="housingType smCon" >
          <p class="title">{{item.houseLayoutName}}</p>
          <p>{{item.houseArea}}㎡
            <span v-show="item.houseOrientationType==='FACE_SOUTH'">朝南</span>
            <span v-show="item.houseOrientationType==='FACE_NORTH'">朝北</span>
            <span v-show="item.houseOrientationType==='FACE_EAST'">朝东</span>
            <span v-show="item.houseOrientationType==='FACE_WEST'">朝西</span>
            <span v-show="item.houseOrientationType==='NORTHWEST'">西北</span>
            <span v-show="item.houseOrientationType==='SOUTHWEST'">西南</span>
            <span v-show="item.houseOrientationType==='SOUTHEAST'">东南</span>
            <span v-show="item.houseOrientationType==='NORTHEAST'">东北</span>
            <span v-show="item.houseOrientationType==='NORTH_SOUTH'">南北</span>
          </p>
          <p >
            <span class="order" v-show="item.isChecked==='FULL'">已满房</span>
            <span class="order" v-show="item.isChecked==='IDEL'">可预订</span>
          </p>
        </div>
        <div class="housingPrice smCon">
          <span>￥{{item.rentalFrom}}起</span><i style="color:#aaa" class="el-icon-arrow-down"></i>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
  import{ XHeader } from 'vux';

  export default {
    name: 'housingView',
    components: { XHeader },
    data() {
      return {
        cityName:"",//默认会有一个城市
        cityList:"",//城市列表
        districtList:"",//行政区列表
        districtName:"",//行政区名字
        projectList:"",//门店列表，即为项目列表
        projectId:"",//项目id
        projectName:"",//门店名称
        housingSumList:"",//户型列表
      }
    },
    mounted() {
      this.getCityList();
    },
    methods: {
      goBack(){//返回
        let vm = this;
        vm.$router.forwardPage();
      },
      goHousingDetail(item){
        let vm = this;
        vm.$router.pushPage({name:"housingType",
          query:{
            data:this.projectId,
          }
        });
      },
      getCityList(){//获取城市列表
        const url = $config.baseURL+`api/public/app/rent/fnd/city/queryAllCity `;
        $axios
          .post(url,{})
          .then(res => {
            console.log(res);
            this.cityList = res.data.rows;
            console.log("城市列表",this.cityList)
          })
          .catch(err => {
            // 所有error情况统一在此处理，包括返回状态码为200，但response.data.success为false的情况
            console.log(err);
          });
      },
      getDistrictList(param){//获取行政区列表
        const url = $config.baseURL+`api/public/app/rent/fnd/district/queryDistrictByCityName `;
        $axios
          .post(url,{"cityName":param})
          .then(res => {
            // 注意：res即为response.data，不再需要进行response.data.success判断
            console.log(res);
            this.districtList = res.data.rows;
            console.log("行政区列表",this.districtList)
          })
          .catch(err => {
            // 所有error情况统一在此处理，包括返回状态码为200，但response.data.success为false的情况
            console.log(err);
          });
      },
      getProjectList(param1,param2){//获取项目即门店筛选列表
        const url = $config.baseURL+`api/public/app/project/selectCityName`;
        $axios
          .post(url,{"cityName":param1,"districtName":param2})
          .then(res => {
            // 注意：res即为response.data，不再需要进行response.data.success判断
            console.log(res);
            this.projectList = res.data.projectAll;
            console.log("门店筛选",this.projectList)
          })
          .catch(err => {
            // 所有error情况统一在此处理，包括返回状态码为200，但response.data.success为false的情况
            console.log(err);
          });
      },
      getHousingSumList(param){//获取户型列表
        const url = $config.baseURL+`api/public/app/project/querProHouse`;
        $axios
          .post(url,{"projectId":param})
          .then(res => {
            // 注意：res即为response.data，不再需要进行response.data.success判断
            console.log(res);
            this.housingSumList = res.data.houseList;
            console.log("户型列表",this.housingSumList)
          })
          .catch(err => {
            // 所有error情况统一在此处理，包括返回状态码为200，但response.data.success为false的情况
            console.log(err);
          });
      },
      cityChange(){//选择城市
        console.log("选择的城市是",this.cityName);
        this.districtName="";
        this.projectName="";
        this.getDistrictList(this.cityName);//通过城市查询行政区
        this.getProjectList(this.cityName);//单独的城市查询到城市下所有门店
      },
      clearBoth(){
        this.districtName="";
        this.projectId="";
        this.housingSumList="";
      },
      districtChange(){//选择行政区
        this.projectName="";
        this.getProjectList(this.cityName,this.districtName);//通过城市和行政区查询门店
        console.log("选择的行政区是",this.districtName)
      },
      clearProject(){
        this.projectId="";
        this.housingSumList="";
      },
      projectChange(){//选择门店
          console.log("选择到的项目id",this.projectId);
        this.getHousingSumList(this.projectId);
      },
    },

  }

</script>

<style type="text/scss" lang="scss" rel="stylesheet/scss">
  .housingView{
    text-align:left;
    .selectWrap{
      padding:10px;
      border-bottom:1px solid #ddd;
      .menuFirst{
        display:flex;
        .selectMenu{
          flex:1;
          .selectBar{
            width:70%;
          }
        }
      }
      .selectMenu{
        margin:10px 0;
        .selectBar{
          width:89%;
        }
      }
    }
    .housingListWrap{
      padding:15px;
      .housingSum{
        border-bottom:1px solid #eee;
        display:flex;
        cursor: pointer;
        margin:10px 0;
        .smCon:first-child{
          flex:3;
        }
        .smCon:nth-child(2){
          flex:4;
        }
        .smCon:last-child{
          flex:3;
        }
        .housingType{
          p{
            margin:10px;
          }
          p:nth-child(2){
            color:#aaa;
          }
          .title{
            font-size:17px;
            font-weight:600;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
          span.order{
              border: 1px solid #c9a05b;
              display: inline-block;
              padding: 3px 5px;
              border-radius: 3px;
              background:#fcf3e9;
          }
        }
        .housingPrice{
          text-align:right;
          span{
            font-size:20px;
            margin:47px 0;
            color:#ee6723;
          }
          i{
            margin:47px 0;
          }
        }
      }
    }
  }
</style>
