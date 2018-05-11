<template>
  <div>
    <div class="lbWrap login" v-if="true">
      <x-header class="header" title="绑定手机" :left-options="{backText:null,preventGoBack:'true'}" @on-click-back="goBack()"></x-header>
      <span class="checkData">验证信息</span>
      <section>
        <div class="inputList"><span>手机号码</span>
          <div class="inputWrap">
            <input placeholder="请输入手机号码" type="text" v-model="phoneNumber">
          </div>
        </div>
        <div class="inputList"><span>验证码</span>
          <div class="inputWrap">
            <input placeholder="请输入验证码" type="text" v-model="inputMessageCode">
            <span style="color:#45A7EF" @click="sendMessage">发送验证码</span>
          </div>
        </div>
      </section>
      <el-button class="submit" type="primary" @click="submit">提交</el-button>
    </div>
    <div class="lbWrap bespeak" v-if="false">
      <x-header class="header" title="预约看房" :left-options="{backText:null,preventGoBack:'true'}" @on-click-back="goBack()"></x-header>
      <section>
        <div class="inputList"><span>姓名</span><div class="inputWrap"><input placeholder="请输入姓名" type="text"></div></div>
        <div class="inputList second"><span>手机</span><div class="inputWrap"><input placeholder="请输入手机号码" type="text"></div></div>
        <div class="inputList">
          <span>看房时间</span>
          <div class="inputWrap">
            <group>
              <datetime-range  title="" placeholder="请输入看房时间" format="YYYY年MM月DD日" :start-date="nowDay" :end-date="toDay" ></datetime-range>
            </group>
          </div>
        </div>
      </section>
      <el-button class="submit" type="primary">提交</el-button>
    </div>
  </div>

</template>

<script>
  import{ XHeader, Group, DatetimeRange } from 'vux';

  export default {
    name: 'login',
    components: { XHeader, Group, DatetimeRange},
    data() {
      return {
        nowDay:"",//当前时间
        toDay:"",//结束时间
        phoneNumber:"",
        messageCode:"",
        inputMessageCode:"",
      }
    },
    methods: {
      goBack(){//返回
        let vm = this;
        vm.$router.forwardPage();
      },
      getNowDay(){//获取当天格式化后日期
        let nowYear =  new Date().getFullYear();//当前年份
        let nowMonth = new Date().getMonth()+1;//月份0-11
        let nowDay =new Date().getDate();//当前日期
        return  nowYear+"-"+nowMonth+"-"+nowDay;//返回格式化后的日期 如2018年1月9日
      },
      getToDay(){//获取结束时间
        let date1 = new Date();
        let date2 = new Date(date1);
        date2.setDate(date1.getDate() + 20);
        return date2.getFullYear() + "-" + (date2.getMonth() + 1) + "-" + date2.getDate();
      },
      getMessageCodeList(){//获取城市列表
        const url = $config.baseURL+`api/public/rent/csr/user/sendMessageCode`;
        $axios
          .post(url,{phoneNo:this.phoneNumber,equipmentId:"",operateType:"R"})
          .then(res => {
            console.log(res);
            this.messageCode = response.data.messageCode;
          })
          .catch(err => {
            // 所有error情况统一在此处理，包括返回状态码为200，但response.data.success为false的情况
            console.log(err);
          });
      },
      sendMessage(){
        this.getMessageCodeList();
      },
      submit(){
        if(this.inputMessageCode!==""&&this.inputMessageCode === this.messageCode){
          this.$alert('绑定成功，点击确定进行预约', '提示', {
            confirmButtonText: '确定',
            center: true,
            showClose:false,
          });
        }
      },
    },
    mounted() {
      this.nowDay = this.getNowDay();
      this.toDay = this.getToDay();
      console.log("开始时间",this.nowDay)
      console.log("结束时间",this.toDay)
    }
  }

</script>


<style type="text/scss" lang="scss" rel="stylesheet/scss">
  .lbWrap{
    text-align:left;
    .checkData{
      display:inline-block;
      padding:10px 15px;
    }
    section{
      border-top:1px solid #ddd;
      border-bottom:1px solid #ddd;
      padding:0 15px;
      .inputList{
        padding:20px 0 ;
        display:flex;
        span{
          flex:3
        }
        .inputWrap{
         flex:7;
          .vux-no-group-title{
            margin-top:0;
          }
          .weui-cell{
            padding:0;
            .vux-popup-picker-select{
              text-align:left !important;
            }
          }
          .weui-cells:before{
            border-top:none;
          }
          .weui-cells:after{
            border-bottom:none;
          }
          input{
            border:none;
          }
        }
      }
      .second{
        border-bottom:1px solid #ddd;
      }
    }
    section>div:first-child{
      border-bottom:1px solid #ddd;
    }
    .submit{
      position:absolute;
      left:50%;
      bottom:100px;
      width:136px;
      margin-left:-68px;
    }
  }
</style>
