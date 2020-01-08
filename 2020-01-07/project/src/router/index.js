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
    path: '/b1',
    name: 'b1',
    component:() => import('../views/b1.vue'),
    //记录从哪里来
    beforeEnter: (to, from, next) => {
      if(from.fullPath === '/b2' && to.fullPath === '/b1') {
        next('/');
        alert('局部');
      }else{
        next();
      }
    }

  },
  {
    path:'/b2',
    component: () => import('../views/b2.vue')
  },
  {
    path:'/foo/:id',
    component: () => import('../views/foo.vue')
  },
  {
    path:'*',
    component: () => import('../views/404.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});
router.beforeEach((to, from, next)=>{
  // console.log(to,from)
  if(from.fullPath === '/b2' && to.fullPath === '/b1'){
    next('/');
    alert('全局')
  }else{
    next();
  }

  // if(from.fullPath === '/b1' && to.fullPath === '/b2'){
  //   // next(false);
  //   // next('/')
  //   next({ path: '/',replace:true });
  // }else{
    // next();
  // }
});


// router.afterEach((to, from) => {
//   console.log('afterEach');
//   console.log(to,from);
// });

export default router
