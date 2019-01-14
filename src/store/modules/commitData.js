const state = {
    commitList:{
      companyName:"",//公司name
      companyCode:"",//公司Id
      lineCode:"",
      lineName:"",
      useDepartmentCode:"",
      useDepartmentName:"",
      manageDepartmentCode:"",
      manageDepartmentName:"",
      positionCode: "",
      positionName: "",
      userCode:"",
      userName:"",
      managerName:"",
      managerCode:"",
      materialName:"",//物资编号
      materialCode:"",
      firstWarehouseName:"",//一级库
      firstWarehouseCode:"",//一级库
      secondWarehouseName:"",//二级库
      secondWarehouseCode:"",//二级库
      allocationName:"",//货位
      allocationCode:"",//货位
    }
};

const getters = {
  getCommitFn(state){//获得存贮在vuex中数据的方法
    return state.commitList;
  }
};

const mutations = {
  // state指的是state的数据
  setCommit(state,  commitList){
    state.commitList= commitList;//将传参设置给state
  }
};

// actions不做统一处理，因为大多数情况下，并不需要使用异步设置值
// 若需要使用actions，注意：mutation_type的命名规则为set开头加上state对象属性的camel形式
// const actions = {
//   async setIncrement({ commit }, value) {
//     commit('setIncrement', await value);
//   },
// };
const actions = {//api接口相关  异步操作需要
  setCommitFn({commit, state}, commitList){
    commit("setCommit", commitList);
  }
};

export default {
  state,
  getters,
  mutations,
  actions,
};
