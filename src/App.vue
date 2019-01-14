<template>
  <div id="app">
    <transition :name="transitionName">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </transition>
  </div>
</template>
<script>
  /* eslint-disable */
  export default {
    name: 'app',
    data(){
      return {
        transitionName: 'fade-in',
      }
    },
    watch: {
      $route (to, from) {
        const toDepth = to.path.split('/').length;
        const fromDepth = from.path.split('/').length;
        this.transitionName = toDepth < fromDepth ? 'fade-in' : 'fade-out'
      },
    },
    mounted() {
      let vm = this;
      //获取app token
      try {
        window.ACallBackToken = function (message) {
          let obj = JSON.parse(message);
          window.localStorage.token = obj.token;
          window.localStorage.empId = obj.account;
          window.localStorage.userName = obj.userName;
        };
        window.bCallBack = function (message) {
          hmsPopup.showShortCenterToast(message);
        };
        let dict = {
          "className": "BaseBridge",
          "function": "getBaseInfo",
          "successCallBack": "ACallBackToken",
          "failureCallBack": "bCallBack"
        };
        HandBridge.postMessage(JSON.stringify(dict));
      } catch (err) {
        //console.log(err);
      }
      /*window.localStorage.token = "4ece78f1-b638-4f66-9545-b8442563435e";
       window.localStorage.empId = "101892";
//      window.localStorage.empId = "101400";
      window.localStorage.userName = "季红雷";*/
    },
  };
</script>

<style lang="scss">
  @import './assets/fonts/iconfont/iconfont.css';
  @import './assets/scss/app.scss';

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: left;
    color: #000;
    height: 100%;
    overflow: hidden;
    background: #f6f6f6;
    -webkit-appearance: none;
    -webkit-tap-highlight-color: transparent;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
  }

  input {
    -webkit-user-select: auto; /*webkit浏览器*/
  }

  a {
    text-decoration: none;
  }

  p {
    margin: 0;
  }

  body, html {
    height: 100%;
  }

  .fade-in-enter-active,
  .fade-out-enter-active,
  .fade-in-leave-active,
  .fade-out-leave-active {
    transition: all .3s cubic-bezier(0.165, 0.84, 0.44, 1);
  }

  .fade-out-enter, .fade-in-leave-to {
    position: absolute;
    width: 100%;
    height: 100%;
    opacity: 0;
    -webkit-transform: translate3d(100%, 0, 0);
    transform: translate3d(100%, 0, 0);
  }

  .fade-in-enter, .fade-out-leave-to {
    position: absolute;
    width: 100%;
    height: 100%;
    opacity: 0;
    -webkit-transform: translate3d(-100, 0, 0);
    transform: translate3d(-100%, 0, 0);
  }
</style>

