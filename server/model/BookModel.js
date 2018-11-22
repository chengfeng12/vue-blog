import query from '../utils/query'
import eacaep from '../utils/eacaep'
class BookModel {
    async GetBook () {
        return await query(eacaep`SELECT * FROM RD_LIST`)
    }
    async deleteBook (id) {
        return await query(eacaep`DELETE FROM RD_LIST WHERE id=${id}`)
    }
    async updateBook (id,{name,author,score}) {
        return await query(eacaep`UPDATE RD_LIST SET name=${name},author=${author},score=${score} WHERE id=${id}`)
    }
    async addBook ({name,author,score}) {
        return await query(eacaep`INSERT INTO RD_LIST SET name=${name},author=${author},score=${score}`);
    }
} 
export default new BookModel()