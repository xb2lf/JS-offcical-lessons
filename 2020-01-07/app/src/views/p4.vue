<template>
    <div>
        
       <h1>我是p4页面</h1>
       <p>请看我接收到的数据:{{n}}</p>
       <!-- {{$route.params.n}} -->
    </div>
</template>

<script>
    export default {
        props:['n'],
        name:'p4'
    }
</script>

<style lang="scss" scoped>

</style>