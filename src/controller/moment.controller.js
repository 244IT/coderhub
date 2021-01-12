const { create, detail, list } = require("../service/moment.service")

class MomentController{
    /* 新增动态 */
    async create(ctx, next) {
        // 获取发表动态的用户id和评论内容
        const { id } = ctx.user
        const { content } = ctx.request.body
        // 新增动态（操作数据库）
        const result = await create(id, content)
        ctx.body = result
    }
    /* 获取动态详情 */
    async detail(ctx, next) {
        // 获取动态id
        const { id } = ctx.params
        // 获取动态详情（操作数据库）
        const result = await detail(id)
        ctx.body = result
    }

    /* 获取动态列表 */
    async list(ctx, next) {
        // 获取列表大小和页数
        const { size, page } = ctx.request.query
        // 获取动态列表（操作数据库）
        const result = await list(size, page)
        ctx.body = result
    }
}


module.exports = new MomentController()