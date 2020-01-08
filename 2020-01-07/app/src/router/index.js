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
    path:'/home/:uname/id/:id',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Home.vue')
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path:'/about/:id',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path:'/public/',
    component: () => import('../views/public.vue'),
    children:[
      {
        path: 'p1',//  /public/p1  path: 'p1' 的*p1* 不要加/，不然就不匹配就是根目录
        component: () => import('../views/p1.vue')
      },
      {
        path: 'p2',
        component: () => import('../views/p2.vue')
      },
      //如果进入/public下没有指定的children,默认添加一个组件，可以在path上写个''
      {
        path:'',
        component: () => import('../views/p3.vue')
      }
    ]
  },
  {
    path: '/propnav',
    name: 'propnav',
    component: () => import('../views/propNav.vue'),
    children:[
      {
        path:'p4',
        name:'p4',
        props:true,
        component: () => import('../views/p4.vue')
      },
      {
        path:'p5',
        name:'p5',
        //当做一个传递数据的钩子
        props:(route)=>({
          nm:route.params.nn
        }),
        component: () => import('../views/p5.vue')
      },
    ],
  },
  {
    path:'/redirect',
    name:'redirect',
    component:() => import('../views/redirect.vue')
  },
  {
    path:'/p8',
    // redirect:'/redirect'
    redirect:to=>{
      // console.log(to.fullPath)
      return '/redirect';
    }
  },
  {
    path:'*',
    component:() => import('../views/404.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
