const state = {
  num:0,
};

const mutations = {
  increment(state) {
    state.num ++;
  },
  changeval() {
    console.log('我这个事件也触发了吗');
  }
};

const actions = {
  asyncincrement(context) {// context-> store
      setTimeout(() => {
        context.commit('increment');
      }, 500);
  }
};
export default {
  state,
  mutations,
  actions,
};
