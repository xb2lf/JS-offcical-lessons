<template>
  <div>
    <h1>This is an mutation page</h1>
    <p>{{reverse}}</p>
    <button @click="add">{{num}}</button>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      val: "Welcome to Beijing"
    };
  },
  methods: {
    add() {
      this.$store.commit("increment");
    }
  },
//   computed: { // 第一种方式
//     num() {
//       return this.$store.state.num;
//     }
//   }

//   computed: mapState({// 第二种方式
//       num:state => state.num,
//   })

// computed:mapState(['num']), //第三种方式

     computed:{
         ...mapState(['num']), // 第四种方式
        reverse() {
            return this.val.split('').reverse().join('');
        }
     },
};
</script>

<style lang="scss" scoped>
</style>