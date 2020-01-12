import Vue from 'vue';

//两种写法

//第一种
// export const bus = new Vue();

//第二种
const bus = new Vue();
export {bus};

/* 
带{}
    export const xx = 10

    const a = 10;
     export {a}
不带{}
     export default xx

*/