const FavorService = require('../service/favor.service.js')

class FavorController{
    /* 动态点赞 */
    async moment(ctx, next) {
        // 获取用户id和动态id
        const { id } = ctx.user
        const { momentId } = ctx.request.body
        let msg = ''
        // 判断此用户是否已经点赞此动态
        const result = await FavorService.isMomentFavor(id, momentId)
        console.log(result)
        // 点赞过动态，则取消点赞
        if(result) {
            msg = '取消点赞成功'
            await FavorService.disfavorMoment(id, momentId)
        }else {
            msg = '点赞成功'
            await FavorService.favorMoment(id, momentId)
        }
 
        ctx.body = {
            message: msg,
            status: '10000',
        }
    }

    /* 评论点赞 */
    async comment(ctx, next) {
        const { id } = ctx.user
        const { commentId } = ctx.request.body
        let msg = ''
        try{
            // 判断此用户是否已经点赞此评论
            const result = await FavorService.isCommentFavor(id, commentId)
            console.log(result)
            // 点赞过评论，则取消点赞
            if(result) {
                msg = '取消点赞成功'
                await FavorService.disfavorComment(id, commentId)
            }else {
                msg = '点赞成功'
                await FavorService.favorComment(id, commentId)
            }
 
        }catch(e) {
            console.log(e)
        }
        ctx.body = {
            message: msg,
            status: '10000',
        }
    }

    /* 获取用户点赞的文章 */
    async getMomentList(ctx, next) {
        console.log('获取点赞')
        
        const { id } = ctx.user
        const { page, size } = ctx.request.query
        console.log(id)
        const result = await FavorService.getMomentList(id, size, page)
        console.log(result)
        ctx.body = {
            data: result,
            message: 'SUCCESS',
            status: '10000',
        }
    }
}   

module.exports = new FavorController()