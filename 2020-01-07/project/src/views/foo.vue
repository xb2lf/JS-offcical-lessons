<template>
  <div>
    <h1>THis is an foo page</h1>
    <!-- <router-link to="/foo/1" tag="button">Go foo1</router-link>
    <router-link to="/foo/2" tag="button">Go foo2</router-link> -->
    <div v-if="$route.params.id == 1">这是foo1的页面</div>
    <div v-if="$route.params.id == 2">这是foo2的页面</div>
  </div>
</template>

<script>
export default {
  created() {
    console.log(this.$route.params);
  },
  beforeRouteUpdate(to, from, next) {
    console.log("路由切换了");
    next();
  },
  beforeRouteLeave: (to, from, next) => {
    let b = confirm("你真的要离开了吗？");
    if (b) {
      next();
    } else {
      next(false);
    }
  }
};
</script>

<style lang="scss" scoped>
</style>