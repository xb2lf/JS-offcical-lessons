import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    num:0,
  },
  //mutations只能同步的修改数据
  mutations: {
    increment(state) {
      state.num ++;
    }
  },
  //放异步代码
  actions: {
    asyncincrement({commit}) {
      setTimeout(() => {
        commit('increment');
      }, 500);
    }
  },
  modules: {
  }
})
