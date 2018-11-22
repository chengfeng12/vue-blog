import query from '../utils/query'
import eacaep from '../utils/eacaep'
class AboutModel {
    async about () {
        return await query(eacaep`SELECT * FROM ABOUT`)
    }
    async updateAbout ({id,content}) {
        return await query(eacaep`UPDATE ABOUT SET content=${content} WHERE id=${id}`)
    }
}
export default new AboutModel()