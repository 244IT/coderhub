const fs = require('fs')

const MomentService = require("../service/moment.service")
const FileService = require('../service/file.service')

const { PICTURE_PATH } = require('../constants/file-paths')

class MomentController{
    /* 新增动态 */
    async create(ctx, next) {
        // 获取发表动态的用户id和评论内容
        const { id } = ctx.user
        const { content, title } = ctx.request.body
        // 新增动态（操作数据库）
        const [result] = await MomentService.create(id, content, title)
        console.log('新增动态成功')
        console.log(result)
        ctx.body = {
            data: {
                momentId: result.insertId
            },
            status: '10000',
            message: '新增动态成功'
        }
    }
    /* 获取动态详情 */
    async detail(ctx, next) {
        // 获取动态id
        const { id } = ctx.params
        const { uid } = ctx.request.query
        console.log('获取动态详情')
        console.log(id, uid, typeof uid)
        // 获取动态详情（操作数据库）
        try{
            const result = await MomentService.detail(id, uid)
        }catch(err) {
            console.log(err)
        }
        ctx.body = {
            data: result,
            status: '10000',
            message: '获取成功'
        }
    }

    /* 获取动态列表 */
    async list(ctx, next) {
        // 获取列表大小和页数
        const { size, page, keyword } = ctx.request.query
        let result
        // 获取动态列表（操作数据库）
        try {
            result = await MomentService.list(size, page, keyword)
        }catch(err) {
            console.log(err)
        }
        
        ctx.body = {
            data: result,
            status: '10000',
            message: '获取成功'
        }
    }

    /* 获取用户的动态列表 */
    async userList(ctx, next) {
        console.log('获取用户的动态')
        // 获取列表页大小和页数
        const { size, page } = ctx.request.query
        const { id } = ctx.user
        // 获取动态列表（操作数据库）
        const result = await MomentService.userList(size, page, id)
        ctx.body = {
            data: result,
            status: '10000',
            message: '获取成功'
        }
    }

    /* 修改动态 */
    async update(ctx, next) {
        // 获取用户id和修改的内容
        const { content, title } = ctx.request.body
        const { momentId } = ctx.params
        // 修改动态
        await MomentService.update(momentId, content, title)
        ctx.body = {
            status: '10000',
            message: '修改动态成功'
        }
    }

    /* 删除动态 */
    async remove(ctx, next) {
        // 获取动态的id
        const { momentId } = ctx.params

        // 删除动态
        await MomentService.remove(momentId)
        ctx.body = {
            status: '10000',
            message: '删除成功'
        } 
    }

    /* 添加标签 */
    async addLabel(ctx, next) {
        // 获取动态id和添加的标签id
        console.log('添加标签')
        const { momentId } = ctx.params
        const { labels } = ctx

        // 查询这个动态是否已经有标签
        let result = await MomentService.getLabel(momentId)
        console.log(momentId, labels)
        console.log(result)
        // 如果有标签，修改标签, 否则新增标签
        if(result.labelList) {
            console.log('已经有标签了')
            await MomentService.updateLabel(momentId, labels.id)
        }else {
            console.log('没有标签')
            await MomentService.addConnection(momentId, labels.id)
        }

        ctx.body = {
            message: 'SUCCESS',
            status: '10000',
        }
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

    /* 用户添加动态足迹 */
    async footprint(ctx, next) {
        console.log('添加足迹')
        const { id } = ctx.user
        const { momentId } = ctx.request.body
        console.log(id, momentId)
        // 查询用户是否已经浏览过
        const result = await MomentService.getFootprintByUser(momentId, id)
        console.log(result.length)
        // 已经存在足迹则修改足迹
        try{
            if(result.length) {
                await MomentService.updateFootprint(momentId, id)
            }else {
                await MomentService.footprint(momentId, id)
            }
        }catch(e) {
            console.log(e)
        }
        ctx.body = {
            message: 'SUCCESS',
            status: '10000'
        }
    }

    /* 获取用户的浏览记录 */
    async footprintList(ctx, next) {
        const { id } = ctx.user
        const { page, size } = ctx.request.query
        const result = await MomentService.footprintList(id, size, page)
        ctx.body = {
            data: result,
            message: 'SUCCESS',
            status: '10000'
        }
    }

}


module.exports = new MomentController()