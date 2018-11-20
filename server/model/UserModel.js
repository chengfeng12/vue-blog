import query from '../utils/query'
class UserModel {
    async getUserByName(user) {
        return await query(`SELECT * FROM USER WHERE user='${user}'`)
    }
    async addUser(user,password) {
        // return await query("INSERT INTO ARTICLE SET title='新文章',tags='',createTime=NOW(),publishTime=NOW(),content=''")
        return await query(`INSERT INTO USER SET user='${user}',password='${password}'`)
    }
}
export default new UserModel()