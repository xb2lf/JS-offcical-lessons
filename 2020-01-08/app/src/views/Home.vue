<template>
  <div class="home">
    <h1>THis is an Home page</h1>
    <router-link :to="{name:'pp',params:{id:'1'}}" tag="button">Go p1</router-link>
    <router-link :to="{name:'pp',params:{id:'2'}}" tag="button">Go p2</router-link>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "home"
};
</script>
