import Router from 'koa-router'
import { base_API } from "../config"


//引入登录注册的控制器
import UserController from '../Controller/UserController'
const router = new Router()

// 引入登出的checkToken
import checkToken from '../utils/checkToken'

// 文章相关的控制器
import ArticleController from '../Controller/ArticleController'
router.get('/',async ctx=>{
    ctx.body = '换用使用vue-blog接口测试服务器！！！'
})

// 前端发过来的请求的时候都是 http://localhost:3000/api/...
// 所有的路由直接写在这里
router.prefix(`${base_API}`)

// 登录逻辑
router.post('/login',UserController.login);
// 退出逻辑
// 只要登陆后才能看到的内容都需要验证一下token的合法性
router.get('/logout',checkToken,UserController.logout);

// 获取所有的文章
router.get('/articles',checkToken,ArticleController.getArticles)
export default router