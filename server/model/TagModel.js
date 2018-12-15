import query from '../utils/query'
import eacaep from '../utils/eacaep'
class TagModel {
    async getTag () {
        return await query(eacaep`SELECT tags FROM ARTICLE`);
    }
    async updateTags (id, { tags }) {
        return await query(eacaep`UPDATE ARTICLE SET tags=${tags} WHERE id=${id}`);
    }
    async deltTags (id,tags) {
        return await query(eacaep`UPDATE ARTICLE SET tags=${tags} WHERE id=${id}`);
    }
}
export default new TagModel()