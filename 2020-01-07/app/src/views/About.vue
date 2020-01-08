<template>
  <div class="about">
    <h1>This is an about page</h1>
    <router-link tag="button" to="/about/1">About1</router-link>
    <router-link tag="button" to="/about/2">About2</router-link>
    <div v-if="$route.params.id == 1">这是about1的页面</div>
    <div v-if="$route.params.id == 2">这是about2的页面</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      num:0,
    }
  },
  created() {
    this.num = this.num ++ ;
    console.log('created',this.num);
    if(this.$route.params.id === '1') {
       setTimeout(() => {
         console.log('请求接口1');
       }, 1000);
    }else if(this.$route.params.id === '2') {
       setTimeout(() => {
         console.log('请求接口2');
       }, 1000);
    }
  },
  watch:{
      '$route'(to, from){
        if(to.params.id === '1'){
          setTimeout(()=>{
            console.log('请求接口1')
          },1000)
        }else if(to.params.id === '2'){
          setTimeout(()=>{
            console.log('请求接口2')
          },1000)
        }
        console.log(to,'to');
        console.log(from,'from')
      }
    }
}
</script>
<style>
</style>
