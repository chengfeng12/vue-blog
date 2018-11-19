import query from '../utils/query'
import eacaep from '../utils/eacaep'
class ArticleModel {
    async getAllArticles () {
        // console.log('我是数据库');
        return await query("SELECT * FROM ARTICLE ORDER BY createTime DESC")
    }
    async addArticle () {
        return await query("INSERT INTO ARTICLE SET title='新文章',tags='',createTime=NOW(),publishTime=NOW(),content=''")
    }
    async getOneArticle (id) {
        return await query(`SELECT * FROM ARTICLE WHERE id=${id}`)
    }
    async updateArticle(id,{title,tags,content,isPublished}){
        return await query(eacaep`UPDATE ARTICLE SET title=${title},tags=${tags},content=${content} WHERE id=${id}`)
    } 
}
export default new ArticleModel()