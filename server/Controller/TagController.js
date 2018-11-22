import TagModel from '../model/TagModel'
class TagController {
    async getTag (ctx) {
        const res = await TagModel.getTag();
        ctx.body = res
    }
}
export default new TagController()