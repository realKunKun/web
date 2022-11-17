import { createRouter, createWebHashHistory } from 'vue-router'
import Login from '../views/AnotherLogIn.vue'

const routes = [
  {
    path: '/',
    name: 'Login',
    component:Login
  },
  {
    path: '/home',
    name: 'Home',
    component: ()=>import('../views/HomeView.vue')
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/translation',
    name: 'Translation',
    //meta: {requireAuth: true,  },
    component: () => import('../views/Translation.vue')
  },{
    path: '/manage',
    name: 'Manage',
    //meta: {requireAuth: true,},
    component: () => import('../views/Manage')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to,from,next)=>{
  if(to.meta.requireAuth){  // 判断该路由是否需要登录权限
    if(localStorage.getItem("access_token")) {  // 从本地存储localStorage获取当前的token是否存在
      next()
    }else{
      next('/home') //如果token不存在，就跳到首页
    }
  }else{
    if(localStorage.getItem("access_token") && to.path == '/login') {  //token存在时候，进去登录页面就自动跳转到首页
      next('/home')
    }else{
      next()
    }
  }
});
export default router