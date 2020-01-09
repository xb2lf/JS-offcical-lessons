<template>
  <div>
    <h1>我是P路由，我也是公共的，可以复用</h1>
    <router-link :to="{name:'pp',params:{id:'1'}}" tag="button">Go p1</router-link>
    <router-link :to="{name:'pp',params:{id:'2'}}" tag="button">Go p2</router-link>
    <div v-if="$route.params.id == 1">
      <h1>This is an p1 page</h1>
    </div>
    <div v-else-if="$route.params.id == 2">
      <h1>This is an p2 page</h1>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "pp",
  props: ["id"],
  data() {
      return {

      }
  },
  created() {
    console.log("组件加载");
  },
  //组件复用的时候使用beforeRouteUpdate去监听
  beforeRouteUpdate: (to, from, next) => {
      console.log('复用组件时触发',to.params.id);
      //如果从p1页跳到p2页（切换路由），则直接返回到home页（模拟权限不够）
      if(from.params.id === '2' && to.params.id === '1') {
          next('/');
      }else {
          next();
      }
  },
  //离开组件的时候触发
  beforeRouteLeave: (to, from, next) => {
      const bool = confirm('亲爱的，你确认要离开吗?');
      if(bool) {
          next();
      }else{
          next(false);
      }
  },
  components:{

  },
};
</script>

<style lang="scss" scoped>
</style>