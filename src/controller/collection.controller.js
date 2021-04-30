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
        
        ctx.body = {
            message: msg,
            status: '10000',
        }
    }


    /* 用户将文章添加收藏夹，取消收藏 */
    async moment(ctx, next) {
        console.log('用户收藏文章')
        const { momentId, uid, collectionId } = ctx.request.body
        console.log(momentId, uid, collectionId)
        let msg = '收藏成功'
        // 查询此文章是否已经被收藏
        const collectionMoment = await CollectionService.getCollectioMomentByUser(momentId, uid, collectionId)
        console.log(collectionMoment)
        if(collectionMoment.length) {
            msg = '取消收藏成功'
            await CollectionService.noCollectionMoment(momentId, uid, collectionId)
        }else {
            await CollectionService.collectionMoment(momentId, uid, collectionId)
        }

        ctx.body = {
            message: msg,
            status: '10000'
        }
    }

    /* 获取用户的收藏夹 */
    async list(ctx, next) {
        
        const { id } = ctx.user

        // 获取收藏夹
        const result = await CollectionService.list(id)
    
        ctx.body = {
            data: result,
            message: 'SUCCESS',
            status: '10000',
        }
    }

    /* 获取用户收藏的文章 */
    async momentList(ctx, next) {
        const { id } = ctx.user
        const { collectionId } = ctx.request.query
        
        // 获取文章列表
        const result = await CollectionService.momentList(id, collectionId)

        ctx.body = {
            data: result,
            message: 'SUCCESS',
            status: '10000'
        }
    } 

    /* 用户收藏夹修改名称 */
    async rename(ctx, next) {
        const { id } = ctx.user
        const { name } = ctx.request.body

        const result = await CollectionService.rename(id, name)

        ctx.body = {
            message: '修改成功',
            status: '10000'
        }
    }
}



module.exports = new CollectionController()