const fs = require('fs')

const { create, detail, list, update, remove, getConnection, addConnection } = require("../service/moment.service")
const FileService = require('../service/file.service')

const { PICTURE_PATH } = require('../constants/file-paths')

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
        // 获取用户id和修改的内容
        const { content } = ctx.request.body
        const { momentId } = ctx.params
        // 修改动态
        const result = await update(momentId, content)
        ctx.body = result
    }

    /* 删除动态 */
    async remove(ctx, next) {
        // 获取动态的id
        const { momentId } = ctx.params

        // 删除动态
        const result = await remove(momentId)
        ctx.body = result 
    }

    /* 添加标签 */
    async addLabel(ctx, next) {
        // 获取动态id和添加的标签id
        const { momentId } = ctx.params
        const { labels } = ctx
        // 获取标签
        for(let label of labels) {
            // 如果动态已经有这个标签关系，则跳过
            const connectionResult = await getConnection(momentId, label.id)
            if(!connectionResult.length) {
                await addConnection(momentId, label.id)
            }

        }
        ctx.body = '添加标签成功'
    }

    /* 动态配图服务 */
    async fileInfo(ctx, next) {
        let { filename } = ctx.params
        const { type } = ctx.request.query
        const typeArr = ['small', 'middle', 'large']
        const fileInfo = await FileService.getFileByFileName(filename)
        if(typeArr.some(item => item === type)) {
            filename = filename + '-' + type
        }
        ctx.response.set('content-type', fileInfo.mimetype)
        ctx.body = fs.createReadStream(`${PICTURE_PATH}/${filename}`)      
    }
}


module.exports = new MomentController()