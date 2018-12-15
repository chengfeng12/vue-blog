import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// 引入登录组件
import Login from '@/components/Login'
// 引入主页面组件
import List from '@/components/List'
// 引入注册组件
import Regist from '@/components/Regist'
// 引入Tag组件
import Tag from '@/components/Tag'
// 引入Reade组件
import Reade from '@/components/Reading'
// 引入关于我的组件
import About from '@/components/About'
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
        path: '/tags',
        component: Tag
      },
      {
        path: '/readinglists',
        component: Reade
      },
      {
        path: '/about',
        component: About
      },
      {
        path: '*',
        redirect: '/login'
      }
  ]
})
