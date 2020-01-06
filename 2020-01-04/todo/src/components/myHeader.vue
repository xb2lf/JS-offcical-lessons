<template>
    <header class="header"  v-cloak>
                <h1>todos</h1>
                <input 
                    class="new-todo" 
                    placeholder="请输入内容"
                    v-model.trim="val"
                    @keyup.13="enterFn"
                >
            </header>
</template>

<script>
    export default {
        data() {
            return {
                val:'',
            }
        },
        methods:{
            enterFn() {
                this.$emit('cv',this.val);
                this.val= '';
            }
        }
    }
</script>

<style scoped>

</style>