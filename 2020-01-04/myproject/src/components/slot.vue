<template>
    <div>
        <p>我是一个插槽</p>
        <ul> 
            <li v-for="(val,key) in arr">
                <slot
                :id="val.id"
                :n="val.key"
                :age="val.age"
                name="list"
                ></slot>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        props:['arr']
    }
</script>

<style lang="scss" scoped>

</style>