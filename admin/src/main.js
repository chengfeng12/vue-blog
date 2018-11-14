// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// 将状态管理的文件引入进来
import store from '@/store'

// 将图标库的js文件引入进来
import '@/assets/icon/iconfont'

// 引全局的样式
import '@/assets/style/index'

// 如果以后做项目的话，vue里面的插件都是在main.js中引入的
// 我们在这里引入一个表单的擦肩，用来进行账号密码验证
import VeeValidate from 'vee-validate'
Vue.use(VeeValidate)

// 在这里引入消息提示的插件，用来对用户名的只是合法进行验证
import Notifications from 'vue-notification'
Vue.use(Notifications)

// 加入我们的权限判断
import '@/permission'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
