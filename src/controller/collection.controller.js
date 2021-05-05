const CollectionService = require('../service/collection.service')

const errorType = require('../constants/error-types')

class CollectionController{

    /* 用户添加收藏夹 */
    async user(ctx, next) {
        const { id } = ctx.collection
        const uid = ctx.user.id
        console.log(id, uid)
        /* 查询此用户是否已经添加此收藏夹 */
        const collection = await CollectionService.getCollectionByUser(uid, id)

        /* 用户已添加 */
        if(collection.length) {
            const error = new Error(errorType.COLLECTIONEXIST)
            return ctx.app.emit('error', error, ctx)
        }

        await CollectionService.user(id, uid)
 
        ctx.body = {
            data: {
                collectionId: id
            },
            message: '添加成功',
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
        const collectionMoment = await CollectionService.getCollectioMomentByUser(momentId, uid)
        console.log(collectionMoment)
        if(collectionMoment.length) {
            msg = '取消收藏成功'
            await CollectionService.noCollectionMoment(momentId, uid)
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
        const uid = ctx.user.id
        const { id } = ctx.collection // 新收藏夹的id
        const oName = ctx.request.body.name // 旧收藏夹的名称

        const msg = '修改成功'
        const result = await CollectionService.getCollectionCount(oName)
        await CollectionService.updateUserCollection(id, result.id, uid,)

        // const result = await CollectionService.rename(id, name)

        ctx.body = {
            message: msg,
            status: '10000'
        }
    }
}



module.exports = new CollectionController()