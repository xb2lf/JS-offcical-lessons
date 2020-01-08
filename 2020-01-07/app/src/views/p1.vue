<template>
    <div>
       <router-link to="/" tag="button">返回首页</router-link>
       <h1>我是p1页面</h1>
       <img src="../assets/1.jpg" alt="">
    </div>
</template>

<script>
    export default {
        created() {
            console.log('p1');
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