import Article from '../model/ArticleModel'

class ArticleConteoller {
    async getArticles(ctx){
        // let result = await Article.getAllArticles();
        ctx.body = await Article.getAllArticles()
        // console.log(result);
        
    }
}
export default new ArticleConteoller()