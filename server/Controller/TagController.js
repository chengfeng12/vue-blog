import TagModel from '../model/TagModel'
class TagController {
    async getTag (ctx) {
        const res = await TagModel.getTag();
        ctx.body = res;
    }
    async updateTags (ctx) {
        const id = ctx.params.id;
        const res = await TagModel.updateTags(id,ctx.request.body.tags);
        ctx.body = res;
    }
    async deltTags (ctx) {
        const id = ctx.params.id;
        const res = await TagModel.deltTags(id,ctx.request.body.tags);
        ctx.body = res;
    }
}
export default new TagController()