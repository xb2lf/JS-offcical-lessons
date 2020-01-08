<template>
  <div>
    <h1>我是一个公共的路由，你想去哪儿带上你</h1>
    <router-link tag="button" to="/public/p1">去p1</router-link>
    <router-link tag="button" to="/public/p2">去p2</router-link>
    <router-view></router-view>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
</style>