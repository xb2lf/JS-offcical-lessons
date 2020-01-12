//如果使用了modules，那么子模块是对象

import {INCREMENT} from './creatorActions';

export default {
    namespaced:true, //命名空间
    state:{
        num:0,
        num2:0,
    },
    mutations:{
        CHANGE_NUM2(state,payload) {
            console.log(payload);
            switch (payload) {
                case 'INCRMENT':
                    console.log('incrment触发');
                    state.num2 ++;
                    break;
                case 'DECRMENT':
                    state.num2 --;
                default:
                    break;
            }
        },
        [INCREMENT](state) {
            state.num ++;
        },
        AA() {
            console.log('index的aaa');
        },
    },
    actions:{
        asyncIncrement({commit}){
            setTimeout(() => {
              commit('INCREMENT');
            }, 500);
          }
    }
}