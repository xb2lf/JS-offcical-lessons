<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <button @click="add">非异步{{num}}</button>
    <button @click="add2">异步{{num}}</button>
    <router-view/>
  </div>
</template>
<script>
  import {mapState,mapMutations,mapActions} from 'vuex';

  export default {
    computed:{
      ...mapState(['num'])
    },
    methods:{
      ...mapMutations(['increment']),
      ...mapActions(['asyncincrement']),
      add() {
        this.increment();
      },
      add2() {
        this.asyncincrement();
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
