import Article from '../model/ArticleModel'

class ArticleConteoller {
    async getArticles (ctx) {
        ctx.body = await Article.getAllArticles()
    }
    async addArticle (ctx) {
        ctx.body = await Article.addArticle()
    }
    async getOneArticle (ctx) {
        ctx.body =  await Article.getOneArticle(ctx.params.id);
    }
    async updateArticle(ctx) {
        const id = ctx.params.id
        const res = await Article.updateArticle(id,ctx.request.body)
        ctx.body = res
    }
}
export default new ArticleConteoller()