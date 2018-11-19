import query from '../utils/query'
class UserModel {
    async getUserByName(user) {
        return await query(`SELECT * FROM USER WHERE user='${user}'`)
    }
    async addUser(user,password) {
        return await query(``)
    }
}
export default new UserModel()