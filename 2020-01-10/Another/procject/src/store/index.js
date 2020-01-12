import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
/*
    只有mutations才能修改数据（标准）v-model会修改vuex的数据，怎么办？
*/
const store = new Vuex.Store({
    state:{
        num:0
    },
    mutations:{ //mutations放异步事件不生效

     //测试此状态下异步事件，无实际意义
     // methods:{increment},
     // asyncincrement (state) {
     //     setTimeout(() => {
     //         state.num ++
     //     }, 2000);
     // },
        increment(state) {
            state.num ++;
        }
    },
    getters:{
        toDou(state){
            return state.num<10?'0'+state.num:''+state.num
        }
    },
    actions:{ //放异步请求
        asyncincrement(context) { // context->store
             setTimeout(() => {
                 context.commit('increment')
             }, 500);
        }
    }
})

export default store;