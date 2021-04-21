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
        // 关注标签， 则取消关注
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
}   

module.exports = new FavorController()