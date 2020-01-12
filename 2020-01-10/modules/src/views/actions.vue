<template>
    <div>
        <h1>This is an action page</h1>
        <p>{{reverse}}</p>
        <button @click="add">我是非异步{{num}}</button>
        <button @click="add2">我是异步{{num}}</button>
    </div>
</template>

<script>
import {mapState,mapMutations,mapActions,} from 'vuex';
    export default {
        data() {
           return {
               val:'123456789'
           }
        },
        methods:{
           ...mapMutations(['increment']),
           ...mapActions(['asyncincrement']),
           add() {
            //    this.$store.commit('increment');//第一种写法

            //测试此状态下异步事件，无实际意义
            //    setTimeout(() => {
            //     this.$store.commit('increment');
            //      }, 2000);
               this.increment(); // 第二种写法
           },
              add2() {
                // this.$store.dispatch('asyncincrement'); // 第一种写法
                this.asyncincrement(); //  第二种写法

           },
        },
        computed:{
            ...mapState(['num']),
            reverse() {
                return this.val.split('').reverse().join('');
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>