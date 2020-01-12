export default {
    namespaced:true,
    state:{
        val:'今年的新年好忙碌吖'
    },
    mutations:{
        changeval:(state,val) => {
            console.log('这个事件触发没');
            state.val = val;
        }
    },
}