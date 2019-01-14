const state = {
    user:[]
};

const getters = {
  getUserFn(state){//获得存贮在vuex中数据的方法
    return state.user;
  }
};

const mutations = {
  // state指的是state的数据
  setUser(state, user){
    state.user= user;//将传参设置给state
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
  setUserFn({commit, state}, user){
    commit("setUser", user);
  }
};

export default {
  state,
  getters,
  mutations,
  actions,
};
