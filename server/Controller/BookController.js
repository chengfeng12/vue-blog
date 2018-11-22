import BookModel from '../model/BookModel'
class BookController {
    async getReadBook (ctx) {
        const res = await BookModel.GetBook()
        ctx.body = res
    }
    async deleteBook (ctx) {
        const id = ctx.params.id
        const res = await BookModel.deleteBook(id)
        ctx.body = res
    }
    async updateBook (ctx) {
        const id = ctx.params.id
        const res = await BookModel.updateBook(id,ctx.request.body);
        ctx.body = res
    }
    async addBook (ctx) {
        const res = await BookModel.addBook(ctx.request.body);
        ctx.body = res
    }
}
export default new BookController()