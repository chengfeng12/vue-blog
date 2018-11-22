import query from '../utils/query'
import eacaep from '../utils/eacaep'
class TagModel {
    async getTag () {
        return await query(eacaep`SELECT tags FROM ARTICLE`);
    }
}
export default new TagModel()