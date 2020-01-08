<template>
    <div>
       <router-link to="/" tag="button">返回首页</router-link>
       <h1>我是p2页面</h1>
       <img src="../assets/2.jpg" alt="">
    </div>
</template>

<script>
    export default {
        created() {
            console.log('p2');
        }
    }
</script>

<style  scoped>
img {
    display: block;
    width: 200px;
    height: 300px;
    margin: 20px auto;
}

</style>