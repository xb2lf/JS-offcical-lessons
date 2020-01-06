<template>
    <footer class="footer"  v-cloak>
	            <span class="todo-count">
                    <strong  v-cloak>{{leng}}</strong>
                    <!--  -->
	            	<span>条未选中</span>
                </span>
                <ul 
                    class="filters"
                    v-cloak
                >
                    <li>
                        <a 
                            href="#/all" 
                            :class="{selected:myhash=== '#/all'}"
                           
                        >全部</a>
                    </li>
                    <li>
                        <a 
                            href="#/unchecked" 
                            :class="{selected:myhash=== '#/unchecked'}"
                        >未选中</a>
                    </li>
                    <li>
                        <a 
                            href="#/checked"
                             :class="{selected:myhash=== '#/checked'}"
                        >已选中</a>
                    </li>
                </ul>
            </footer>
</template>

<script>
    export default {
         props:['leng','myhash'],
        data() {
            return {

            }
        },
        computed:{
        },
    }
</script>

<style scoped>

</style>