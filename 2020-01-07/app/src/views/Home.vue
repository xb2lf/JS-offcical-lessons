<template>
  <div id="nav">
    <h1>This is an Home page</h1>
    <router-link to="/home/laoli/id/1" tag="button">王妃</router-link>
    <router-link to="/home/mengmeng/id/2" tag="button">陛下</router-link>
      <h2 v-if="$route.params.uname=='laoli'">回来了，陛下</h2>
      <h2 v-if="$route.params.uname=='mengmeng'">噢，我思念的王妃</h2>
       <div class="title">
         <p>用户是:{{$route.params.uname}}</p>
         <p>用户ID是:{{$route.params.id}}</p>
       </div>
  </div>
</template>

<script>
  export default {
    
  }
</script>

<style  scoped>

</style>