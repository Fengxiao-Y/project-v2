import Vue from 'vue'
import  Router from 'vue-router'
// import Home from '../components/Home.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/login',
      component: resolve => require(['@/components/Login'], resolve)  //异步组件加载
    },
    {
      path: '/login',
      name: 'Login',
      component: resolve => require(['@/components/Login'], resolve)  //异步组件加载
    },
    {
      path: '/home',
      // component: Home
      // component: () => import("@/components/Home")  // 路由软加载
      component: resolve => require(['@/components/Home'], resolve)  //异步组件加载
    }
  ],
  mode: 'history'
})