import Vue from 'vue'
import VueRouter from 'vue-router'
import BeforEach from '../components/beforeEach.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: BeforEach,
    children:[
      {
        path: 'foo2',
        component: () => import('../components/foo2.vue'),
        meta:{requiresAuth: true}
      },
      {
        path: 'foo3',
        component: () => import('../components/foo3.vue'),
        meta:{requiresAuth: true}
      },
      {
        path: 'foo4',
        component: () => import('../components/foo4.vue')
      },
    ]
  },
  {
    path: '/login',
    component: () => import('../components/login.vue')
  },
  {
    path:'*',
    component: () => import('../components/404.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});
router.beforeEach((to,from,next) => {
  //需要进行登录验证
  // console.log(to.matched);
  if(to.matched.some(item => item.meta.requiresAuth)) {
    if(!window.localStorage.getItem('login')) {// 如果没有登录，就返回登录页面
      next({
        path:'/login?topath=' + to.path
      })
    }else {
      next();
    }
  }else {
    //不需要登录验证
    next();
  }
})

export default router
