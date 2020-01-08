!<template>
    <div>
       <h1>This is an PropNav page</h1>
       <router-link tag="button" :to="{name:'p4',params:{n:'我是p4的数据'}}">p4</router-link>
       <router-link tag="button" :to="{name:'p5',params:{nn:'我是p5的数据'}}">p5</router-link>
       <router-view></router-view>
    </div>
</template>

<script>
    export default {
        name:'propnav',
        data(){
        return {
            n:'我是p4的数据'
        }
        },
    }
</script>

<style lang="scss" scoped>

</style>