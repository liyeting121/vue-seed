// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import {ViewBox, XHeader} from 'vux';

import App from './App';
import router from './router';
import store from './store';//vuex

import './utils/directives';
import './utils/filters';

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// import { DatetimePlugin } from 'vux'
import {AlertPlugin, LoadingPlugin, ToastPlugin, ConfirmPlugin} from 'vux'
import VConsole from 'vconsole'

const vConsole = new VConsole();
console.log(vConsole.version);

// 注册项目通用插件
Vue.use(ViewBox);
Vue.use(XHeader);
Vue.use(ElementUI);
// Vue.use(DatetimePlugin);
Vue.use(AlertPlugin);
Vue.use(LoadingPlugin);
Vue.use(ToastPlugin);
Vue.use(ConfirmPlugin);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
});
