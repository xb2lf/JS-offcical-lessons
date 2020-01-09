<template>
    <div>
       <h1>我是B路由（是公共的，可以复用）</h1>
       <div v-if="$route.params.id == 1">
           <img src="../../assets/1.jpg" alt="">
       </div>
       <div v-else-if="$route.params.id == 2">
           <img src="../../assets/2.jpg" alt="">
       </div>
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style lang="scss" scoped>

</style>