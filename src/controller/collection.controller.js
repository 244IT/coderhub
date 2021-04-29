const CollectionService = require('../service/collection.service')

class CollectionController{

    /* 用户添加收藏夹 */
    async user(ctx, next) {
        const { id } = ctx.collection
        const uid = ctx.user.id
        console.log(id, uid)
        let msg = '用户已添加此收藏夹'
        /* 查询此用户是否已经添加此收藏夹 */
        const collection = await CollectionService.getCollectionByUser(uid, id)

        /* 用户没添加此收藏夹，则添加 */
        if(!collection.length) {
            await CollectionService.user(id, uid)
            msg = '添加成功'
        }
        
        /* 用户添加收藏夹 */
        // const result = await CollectionService.user(id, name, uid)
        ctx.body = {
            message: msg,
            status: 'SUCCESS',
        }
    }


    /* 用户将文章添加收藏夹 */
    async moment(ctx, next) {
        
    }
}



module.exports = new CollectionController()