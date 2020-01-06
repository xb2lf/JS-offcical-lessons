<template>
 <div id="ppa">
   <!-- 使用 router-link 组件来导航. -->
   <!-- 通过传入 `to` 属性指定链接. -->
    <!-- <router-link> 默认会被渲染成一个 `<a>` 标签 -->
		<router-link to="/" tag="button">去首页</router-link>
		<router-link to="/about" tag="button">去关于</router-link>
		<router-link to="/public" tag="button">去公共页</router-link>
		<router-view></router-view>
    <!-- 设置路由页面渲染的位置 -->
	</div>
</template>

<script>
  export default {
    
  }
</script>

<style lang="scss" scoped>

</style>