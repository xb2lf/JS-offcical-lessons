<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <input type="text" :value="12312" ref="txt" @blur="blur">
    <p> {{vv}}</p>
    <button @click="add">非异步{{num}}</button>
    <button @click="add2">异步{{num}}</button>
    <button @click="add3">触发aaa</button>
    <router-view/>
  </div>
</template>
<script>
  import {mapState,mapMutations,mapActions,mapGetters} from 'vuex';

  export default {
    computed:{
      ...mapState({
        num:state =>state.a.num,
        val:state => state.b.val,
      }),
      ...mapGetters({
        vv:'b/reverse'
      }),
    },
    methods:{
      ...mapMutations(['a/INCREMENT','b/changeval','b/AA']),
      ...mapActions(['a/asyncIncrement']),
      add() {
        this['a/INCREMENT']();
      },
      add2() {
        this['a/asyncIncrement']();
      },
      add3() {
        this['b/AA']();
      },
      blur() {
         this['b/changeval'](this.$refs.txt.value);
      }
    }
  }
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
