<template>
  <div class="about">
    <h1>This is an about page</h1>
    <router-link to="/about/mutations" tag="button">Mutations</router-link>
    <router-link to="/about/actions" tag="button">Actions</router-link>
    <router-link to="/about/getters" tag="button">Getters</router-link>
    <router-view></router-view>
  </div>
</template>

<script>
  export default {

  }
</script>

<style scoped>
  
</style>
