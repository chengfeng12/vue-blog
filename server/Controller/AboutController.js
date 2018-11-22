import AboutModel from '../model/AboutModel'
class AboutController {
    async about (ctx) {
        const res = await AboutModel.about();
        ctx.body = res;
    }
    async updateAbout (ctx) {
        const res = await AboutModel.updateAbout(ctx.request.body);
        ctx.body = res;
    }
}
export default new AboutController()