<template>
  <div class="home">
    <router-link to="/b1" tag="button">Go b1</router-link>
    <router-link to="/b2" tag="button">Go b2</router-link>
    <router-link to="/foo/1" tag="button">Go foo1</router-link>
    <router-link to="/foo/2" tag="button">Go foo2</router-link>
    <router-view></router-view>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  
}
</script>
