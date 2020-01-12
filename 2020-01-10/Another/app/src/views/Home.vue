<template>
  <div class="home">
    输入框:
    <!-- <input type="text" :value="$store.state.store2.val" /> -->
    <input type="text"
    :value="v"
    ref="txt">
    <p>store中的: {{$store.state.store2.val}}</p>
    <button @click="changeVal">确认修改</button>

    <hr />
    <!-- <p>{{num}}{{val}}</p>
    <button @click="add">点击增加{{$store.state.store1.num}}</button>
    <button @click="add">点击增加{{num}}</button> -->
  </div>
</template>

<script>
 import {mapState,mapMutations} from 'vuex';

export default {
  name:'home',
  data() {
    return {
       vv:'12',
    }
  },
  methods:{
    ...mapMutations(['increment','store2/changeval']),
    changeVal() {
      // this.changeval();
       this['store2/changeval']();
    },
    add() {
      this.increment();
    }

  },
  computed:{
    ...mapState({
      num(data) {
        return data.sorte1.num;
      },
      v:({store2:{val}}) => val,
    }),
    vv2() {
      return this.vv + '0';
    }
  }
};
</script>
