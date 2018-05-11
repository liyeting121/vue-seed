<template>
    <div class="housing"><!--门店列表-->
      <!--<x-header class="header" title="搜索文字" :left-options="{backText:null,preventGoBack:'true'}" @on-click-back="goBack()"></x-header>-->
      <!--头部-->
      <header>
        <i class="el-icon-arrow-left"  @click="goBack()"></i>
        <span>搜索文字 <i class="el-icon-caret-bottom"></i></span>
      </header>
      <!--过滤框-->
      <div class="filterMenu">
        <el-select class="selectBar" v-model="value" placeholder="租金">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-select class="selectBar" v-model="value" placeholder="入住时间">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-select class="selectBar" v-model="value" placeholder="筛选">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
      <!--列表展示框-->
      <scroller class="scrollerList">
        <section class="housingWrap">
          <div class="housingSummary" v-for="item in housingList" @click="housingDetail(item)">
            <img src="../../assets/images/home/a.jpeg" width="120px" height="100px" alt="图片">
            <div class="description">
              <h6 class="marBto10">{{item.name}}</h6>
              <div class="marBto10 font14 address">{{item.address}}</div>
              <div class="tips marBto10 font14"><span v-for="items in item.tips">{{items.tipText}}</span></div>
              <div class="size font14 price"><span>{{item.size}}</span><span>{{item.price}}</span></div>
            </div>
          </div>
        </section>
      </scroller>
    </div>
</template>

<script>
  import{XHeader} from 'vux';

export default {
  name: 'Housing',
  components: {XHeader},
  data() {
    return {
      housingList:[
        {
          name:"家园梦想广场-两室一厅",
          address:"真北路地铁站一号口附近",
          tips:[{tipText:"集体供暖"},{tipText:"地铁周边"}, ],
          size:"2室1厅1卫-70平方米",
          price:"￥10000/月"

        },
        {
          name:"家园梦想广场——两市一厅",
          address:"真北路地铁站一号口附近",
          tips:[{tipText:"集体供暖"},{tipText:"地铁周边"}, ],
          size:"2室1厅1卫-70平方米",
          price:"￥10000/月"

        },
        {
          name:"家园梦想广场——两市一厅",
          address:"真北路地铁站一号口附近",
          tips:[{tipText:"集体供暖"},{tipText:"地铁周边"}, ],
          size:"2室1厅1卫-70平方米",
          price:"￥10000/月"

        },
        {
          name:"家园梦想广场——两市一厅",
          address:"真北路地铁站一号口附近",
          tips:[{tipText:"集体供暖"},{tipText:"地铁周边"}, ],
          size:"2室1厅1卫-70平方米",
          price:"￥10000/月"

        },
        {
          name:"家园梦想广场——两市一厅",
          address:"真北路地铁站一号口附近",
          tips:[{tipText:"集体供暖"},{tipText:"地铁周边"}, ],
          size:"2室1厅1卫-70平方米",
          price:"￥10000/月"

        },
        {
          name:"家园梦想广场——两市一厅",
          address:"真北路地铁站一号口附近",
          tips:[{tipText:"集体供暖"},{tipText:"地铁周边"}, ],
          size:"2室1厅1卫-70平方米",
          price:"￥10000/月"

        },
        {
          name:"家园梦想广场——两市一厅",
          address:"真北路地铁站一号口附近",
          tips:[{tipText:"集体供暖"},{tipText:"地铁周边"}, ],
          size:"2室1厅1卫-70平方米",
          price:"￥10000/月"

        },
      ]
    }
  },
  methods: {
    goBack(){
      let vm = this;
      vm.$router.forwardPage();
    },
    housingDetail(item){
      let vm = this;
      vm.$router.pushPage({name:"housingDetail",
        query:{
          data:item,
        }
      });
    },
  getHousingList(){//获取列表详情
      const url = $config.baseURL+`api/public/app/house/layout/queryList`;
      $axios
        .post(url, {"token":"","equipmentId":"","projectId":"","projectName":"","houseLayoutCode":""})
        .then(res => {
          // 注意：res即为response.data，不再需要进行response.data.success判断
          console.log(res);
        })
        .catch(err => {
          // 所有error情况统一在此处理，包括返回状态码为200，但response.data.success为false的情况
          console.log(err);
        });
    },
  },
  mounted() {
      this.getHousingList();
  }
}

</script>

<style type="text/scss" lang="scss" rel="stylesheet/scss">
  .el-select .el-input__inner{
    border:none !important;
  }
 .housing{
   text-align:left;
   .marBto10{
     margin-bottom:6px;
   }
   .font14{
     font-size:14px;
   }
   header{
     width:100%;
     display:flex;
     padding:10px;
     i{
       flex:1;
       font-size:20px;
       text-align:left;
     }
     span{
       flex:9;
       text-align:center;
     }
   }
   .filterMenu{
     display:flex;
     .selectBar{
       flex:1;
       margin:0 8px;
       .el-select {
         .el-input__inner{
           border:none !important;
         }
       }
     }
   }
   .scrollerList{
     position:absolute;
     top:90px;
     left:0;
     .housingWrap{
       padding:15px;
       .housingSummary{
         display: flex;
         border-bottom:1px solid #ddd;
         padding-bottom:15px;
         margin:15px 0;
         img{
           flex:3
         }
         .description{
           flex:7;
           margin:0 15px;
           margin-right:0;
           h6{
             margin:0;
             margin-bottom:10px;
             font-size:16px;
           }
           .address{
             color:#a9a9a9;
           }
           .tips{
             span{
               display: inline-block;
               background:#fcf3e9;
               margin-right:5px;
               padding:5px;
               border-radius: 4px
             }
             span:first-child{
               color:#e87f00;
             }
             span:nth-child(2){
               color:#ea5e14;
             }
           }
           .price{
             color:#a9a9a9;
             span:nth-child(2){
               color:#c9a05b;
               float:right;
             }
           }
         }
       }
     }
   }

 }
</style>
