import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
    children: [
      {
        path: 'b/:id',
        name: 'b',
        component: () => import('../views/params/b.vue'),
      },

    ]
  },
  {
    path:'/p/:id',
    name:'pp',
    props:true,
    component:() => import('../views/params/p.vue'),
    beforeEnter: (to, from, next) => {
      // 这个是加在路由上的，进入组件的时候触发
      console.log('进入组件的时候触发');
      next();
    }
  },
  {
    path: '*',
    component: () => import('../views/404.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});
// 只要切换路由就触发
router.beforeEach((to,from,next) => {
  console.log('只要切换路由就触发');
  next();
}) 

export default router
