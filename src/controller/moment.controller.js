const { create, detail, list, update, remove } = require("../service/moment.service")

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

    /* 修改动态 */
    async update(ctx, next) {
        // 获取动态id
        const { momentId, content } = ctx.request.body
        // 修改动态
        const result = await update(momentId, content)
        ctx.body = result
    }
    /* 删除动态 */
    async remove(ctx, next) {
        // 获取动态ud
        const { momentId } = ctx.request.body
        const result = await remove(momentId)
        ctx.body = result
    }
}


module.exports = new MomentController()