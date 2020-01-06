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
