import query from '../utils/query'

class ArticleModel {
    async getAllArticles () {
        // console.log('我是数据库');
        return await query("SELECT * FROM ARTICLE ORDER BY createTime DESC")
    }
}
export default new ArticleModel()