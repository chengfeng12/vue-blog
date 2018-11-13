import Router from 'koa-router'
import { base_API } from "../config"
const router = new Router()
router.get('/',async ctx=>{
    ctx.body = '换用使用vue-blog接口测试服务器！！！'
})

// 前端发过来的请求的时候都是 http://localhost:3000/api/...
// 所有的路由直接写在这里
router.prefix(`${base_API}`)
router.get('/index',async ctx=>{
    ctx.body = {
        data: '我是首页的接口'
    }
})

export default router