<template>
    <div>
        <h1>THis is an beforeEach page</h1>
       <router-link to="/foo2" tag="button">FOO2</router-link>
        <router-link to="/foo3" tag="button">FOO3</router-link>
        <router-link to="/foo4" tag="button">FOO4</router-link>
        <router-view />
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style lang="scss" scoped>

</style>