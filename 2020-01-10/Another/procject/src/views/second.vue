<template>
    <div>
      <h1>THis is  an Second page</h1>
      <button @click="add">{{num2}}</button>
      <button @click="add2">我是和First关联的</button>
    </div>
</template>

<script>
import {bus} from '../bus/index';
    export default {
        data() {
            return {
                num2:0,
            }
        },
        created(){
           bus.$on('changeFirst', (val) => {
               this.num2 = val;
           })
        },
        methods:{
          add() {
              this.num2 ++;
              bus.$emit('changeSecond',this.num2);
          },
          add2() {
              bus.$emit('changeSecond',this.num2);
          }
        }
    }
</script>

<style lang="scss" scoped>

</style>