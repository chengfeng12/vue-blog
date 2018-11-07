import Router from 'koa-router'
const router = new Router()
router.get('/',async ctx=>{
    ctx.body = '换用使用vue-blog接口测试服务器！！！'
})
// 所有的路由直接写在这里

export default router