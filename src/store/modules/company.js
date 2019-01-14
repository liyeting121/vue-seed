const state = {
    company:[]
};

const getters = {
  getCompanyFn(state){//获得存贮在vuex中数据的方法
    return state.company;
  }
};

const mutations = {
  // state指的是state的数据
  // unitId传递过来的数据
  setCompany(state, company){
    state.company= company;//将传参设置给state
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
  setCompanyFn({commit, state}, company){
    commit("setCompany", company);
  }
};

export default {
  state,
  getters,
  mutations,
  actions,
};
