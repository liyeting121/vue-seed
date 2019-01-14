import Vue from 'vue';
import Vuex from 'vuex';

import propertyStatus from './modules/propertyStatus';//资产盘点状态
import company from './modules/company';//公司
import line from './modules/line';//线路
import useDepart from './modules/useDepart';//使用部门
import manageDepart from './modules/manageDepart';//归口部门
import position from './modules/position';//归口部门
import user from './modules/user';//使用人
import manager from './modules/manager';//管理人
import commitData from './modules/commitData';//搜索提交数据

Vue.use(Vuex);

// https://vuex.vuejs.org/zh-cn/getting-started.html
export default new Vuex.Store({
  modules: {
    propertyStatus, company, line, useDepart, manageDepart, position, user, manager, commitData
  },
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  // strict: process.env.NODE_ENV !== 'production', // 严格模式
});
