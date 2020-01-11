<template>
    <div>
        <h1>THis is an first page</h1>
        <button @click="add">{{num}}</button>
        <button @click="add2">我是和Second关联的</button>
    </div>
</template>

<script>
/*
  把First的值传给Second（点击Second的add2的时候改变First）

  把Second的值传给First（点击First的add2的时候改变Second）
*/
import {bus} from '../bus/index'
    export default {
        created() {
            //**订阅changeSecond事件，事件中把num改成传入的值
            //点击Second的时候改变First
            bus.$on('changeSecond', (val) => {
                this.num = val;
            })
        },
        data() {
            return {
                num:0,
            }
        },
        methods:{
           add() {
               this.num ++;
               bus.$emit('changeFirst',this.num);
           },
           add2() {
              bus.$emit('changeFirst',this.num);
           }
        }
    }
</script>

<style lang="scss" scoped>

</style>