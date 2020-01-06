[toc]

## JS正式课第四十七天

###数据传递复习

#### 父传子

传:在子级的身上定义一个属性:num="pnum"

收:props:['num']


#### 子传父

子组件:
子组件触发事件中定义一个事件this.$emit('hehe')
在子组件中调用子组件自定义的事件值为父级的定义的方法

<ppa @hehe="changnum">

父组件:
父组件也要定义一个修改自己数据的方法

changnum(){}


### 子组件在不给父组件传递数据但会改变父组件的情况
+ v-model（慎用）
+ 数据为引用类型（拷贝一份数据）

### Vue实例（new Vue）的属性总结

```
 /*
   new Vue({
       el:'#app',
       data:{
           //数据
           num:0
       },
       //事件方法或者公共方法
       methods:{  
           toDoule(){

           }
       },
       computed:{
           计算属性（一上来就执行一次，只要数据发生变化又执行）
           数据的二次处理
           watchNum(){ //get
               return this.toDoule(this.num);
           }

           watchNum:{
               //读操作拦截
               get(){
                   return 
               },
               //写操作拦截
               set(val){

               }
           }
       },
       一上来不执行，只有数据改变的时候才执行(数据的二次处理)
       watch:{
           num(){

           }
           num:{
               handler(){

               },
               deep:true,  //深度监听
               immediate:true  //是否一上来就执行
           }
       },
       components:{
           注册组件
       },
       directives:{ //自定义指令
           focus(el){
               bind：只调用一次，指令第一次绑定到元素时调用。在这里可以进行一次性的初始化设置。
               inserted：被绑定元素插入父节点时调用 (仅保证父节点存在，但不一定已被插入文档中)。
               update：所在组件的 VNode 更新时调用，但是可能发生在其子 VNode 更新之前
           }
       },
       filters:{ //管道符
           定义:xx(){
               return xxx.revers()
           }
           使用:{{yy | xx}}
       },
       created(){
           //数据请求
       },
       mounted(){
           //操作DOM
       },
       destroyed(){
           //解除事件绑定、定时器
       }
   })
    */    
```
### 生命周期
+ 一个组件从创建到销毁的过程

#### 图示
![Alt text](./lifecycle.png)

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
    <div id="app">
         <div id="box">
             <button @click="++num" >点击数字累加{{num}}</button>
             <button @click="add">添加数据</button>
             <button @@click="rm">删除组件</button>
             <p v-for="(val,key) in ary">{{val}}</p>
         </div>
    </div>
    <script src="./vue.js"></script>
    <script>
         /*
        重点:
            created  可以做ajax请求
            mounted  可以进行DOM操作
            destroyed 可以解除一些定时器、事件监听..
    */
    new Vue({
        // el:'#app',
        data:{
            num:0,
            ary:['你好吗','我很好','谢谢你','你在哪','我在一个很温暖的地方'],
            timer:null,
        },
        methods: {
            add() {
                this.ary.push(++ this.num);
            },
            rm() {
               this.$destroy();
            },
        },
        beforeCreate() {
            console.log(this.num,'初始化之前');// undefined "初始化之前"  拿不到数据
        },
        created() {
            console.log(this.num,'初始化之后');// 0 "初始化之后"  可以拿到data中的数据
            this.timer = setInterval(() => {
                console.log('请看我还在不在');  // 直到
            }, 1000);
        },
        //如果没有挂在元素，就没有下面的生命周期了

        // 渲染之前
        beforeMount() {
            console.log('渲染之前',box.children);
        },
        //DOM渲染之后，DOM操作
        mounted() {
            console.log('渲染之后',box.children);
        },
        //下面这2个都是数据更新之后，一个是DOM更新之前一个是DOM更新之后
        
        // DOM更新之前
        beforeUpdate() {
            console.log('数据更新之前',box.children,this.ary);
        },
        //DOM更新之后
        updated(){
            console.log('数据更新之后',box.children,this.ary)
        },
        //销毁之前
        beforeDestroy() {
            console.log('销毁之前')
        },
        //销毁之后 ，可以把一些事件、定时器...解除
        destroyed(){
            console.log('销毁之后');
            clearInterval(this.timer);
        }
    }).$mount('#app')
    </script>
</body>
</html>
```
### 路由

```
/*
		单页SPA优点
			不刷新页面，在当前页切换多页的操作方式，能够提高用户体验
			一些后端逻辑(工作)就可以分给前端来做，减少后端同学的压力，提高前端开发的业务能力
			能够共用一些公共静态资源，减少http请求
			实现真正的前后端分离

		/  		-> home.vue
		/about  -> about.vue
		/public -> public.vue

		安装路由:
			npm install vue-router
			或者
			yarn add vue-router

			找到main.js
				1.引包
					import VueRouter from 'vue-router';
				2.安装路由功能
					Vue.use(VueRouter);

				3.实例化VueRouter
					const router = new VueRouter({
						routes:[
							{
								path:'指定路径',
								component:指定路径响应的组件
							}
						]
					});

				4.挂路由
					默认配置是hash路由
					new Vue({
						mode:'history',
						router
					})

				5(*).设置路由页面渲染的位置
					<router-view></router-view>

				

	*/
```
####    单页SPA优点
  + 不刷新页面，在当前页切换多页的操作方式，能够提高用户体验
  +  一些后端逻辑(工作)就可以分给前端来做，减少后端同学的压力，提高前端开发的业务能力
  + 能够共用一些公共静态资源，减少http请求
  + 实现真正的前后端分离

#### 路由设置过程
1. 安装路由:
	>`npm install vue-router
	或者
	yarn add vue-router`
2. 找到main.js

	>` 1. 引包
						import VueRouter from 'vue-router';
		2. 安装路由功能
						Vue.use(VueRouter);
	    3. 实例化VueRouter
						const router = new VueRouter({
							routes:[
								{
									path:'指定路径',
									component:指定路径响应的组件
								}
							]
						});
	    4. 挂路由
						默认配置是hash路由
						new Vue({
							mode:'history',
							router
						})`

```
//在main.js进行
import Vue from 'vue';
import App from './App.vue';
import VueRouter from 'vue-router';// 引入

Vue.use(VueRouter);// 安装路由功能
Vue.config.productionTip = false;
import Home from './components/home.vue';
import About from './components/about.vue';
import Public from './components/public.vue';
const routes = [ // 设置
     {
       path:'/',
       component:Home,
     },
     {
       path:'/about',
       component:About,
     },
     {
       path:'/public',
       component:Public,
     },
];

const router = new VueRouter({ // 实例化VueRouter
  mode:'history', // 默认配置是hash路由  挂路由
  // routes:'routes'
  routes
});
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
```
					
3. (*).设置路由页面渲染的位置
>`<router-view></router-view>`

```
//在App.vue或者其他需要路由页面的位置进行
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
```





