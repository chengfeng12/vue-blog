import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// 引入登录组件
import Login from '@/components/Login'
// 引入主页面组件
import List from '@/components/List'
// 引入注册组件
import Regist from '@/components/Regist'

export default new Router({
  routes: [
    // {
    //   path: '/',
    //   component: List
    // },
      {
        path: '/login',
        component: Login
      },
      {
        path: '/regist',
        component: Regist
      },
      {
        path: '/list',
        component: List
      },
      {
        path: '*',
        redirect: '/login'
      }
  ]
})
