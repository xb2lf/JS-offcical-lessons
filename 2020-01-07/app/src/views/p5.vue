<template>
    <div>
        
       <h1>我是p5页面</h1>
       <p>请看我接收到的数据:{{nm}}</p>
       <!-- {{$route.params.n}} -->
    </div>
</template>

<script>
    export default {
        props:['nm'],
        name:'p5'
    }
</script>

<style lang="scss" scoped>

</style>