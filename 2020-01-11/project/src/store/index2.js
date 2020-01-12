const state = {
    val:'这个冬天不太冷',
};
const mutations = {
    changeval (state,newval) {
        state.val = newval;
    },
    AA() {
        console.log('index2的aaa');
    }
};
const getters = {
    reverse() {
        return state.val.split('').reverse().join('');
    }
}

export default {
    namespaced:true,
    state,
    mutations,
    getters,
}