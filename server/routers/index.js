import Router from 'koa-router'
import { base_API } from "../config"


//引入登录注册的控制器
import UserController from '../Controller/UserController'
const router = new Router()

// 引入登出的checkToken
import checkToken from '../utils/checkToken'

// 文章相关的控制器
import ArticleController from '../Controller/ArticleController'

// 引入标签的控制器
import TagController from '../Controller/TagController'

// 书籍的控制器
import BookController from '../Controller/BookController'

// 引入关于我的控制器
import AboutController from '../Controller/AboutController'

router.get('/',async ctx=>{
    ctx.body = '换用使用vue-blog接口测试服务器！！！'
})

// 前端发过来的请求的时候都是 http://localhost:3000/api/...
// 所有的路由直接写在这里
router.prefix(`${base_API}`)

// 注册逻辑
router.post('/regist',UserController.regist)

// 登录逻辑
router.post('/login',UserController.login);

// 退出逻辑
// 只要登陆后才能看到的内容都需要验证一下token的合法性
router.get('/logout',checkToken,UserController.logout);

// 获取所有的文章
router.get('/articles',checkToken,ArticleController.getArticles)

// 添加一篇新的文章
router.post('/articles/add',checkToken,ArticleController.addArticle)

// 把最新添加的新文章的详细信息
router.get('/articles/:id',checkToken,ArticleController.getOneArticle)

//更新一篇新的文章
router.post('/articles/update/:id',checkToken,ArticleController.updateArticle)

// 删除一篇文章
router.delete('/articles/:id',checkToken,ArticleController.deleteArticle)

// 发布文章
router.put('/articles/publish/:id',checkToken,ArticleController.publishArticle)

// 获取tags列表
router.get('/getTag',checkToken,TagController.getTag)

// 获取阅读的书籍
router.get('/readingBook',checkToken,BookController.getReadBook)

// 删除对应的书籍
router.get('/deletebook/:id',checkToken,BookController.deleteBook)

// 提交书籍的更改信息
router.post('/confirmUpdata/:id',checkToken,BookController.updateBook)

// 添加书籍
router.post('/addBook',checkToken,BookController.addBook)

// 查找关于我的信息
router.get('/about',checkToken,AboutController.about)

// 修改关于我的信息
router.put('/updateAbout',checkToken,AboutController.updateAbout)
export default router