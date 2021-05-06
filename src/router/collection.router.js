const Router = require("koa-router");
const { verifyAuth } = require("../middleware/auth.middleware");
const { verifyCollectionExist } = require('../middleware/collection.middleware')
const { user, moment, momentList, list, rename, remove } = require('../controller/collection.controller')


const collectionRouter = new Router({
    prefix: '/collection'
})


/* 用户添加收藏夹 */
collectionRouter.post('/user', verifyAuth, verifyCollectionExist, user)

/* 用户收藏文章 */
collectionRouter.post('/moment', verifyAuth, moment)

/* 获取用户的收藏夹 */
collectionRouter.get('/list', verifyAuth, list)

/* 获取用户收藏的文章 */
collectionRouter.get('/momentList', verifyAuth, momentList)

/* 用户收藏夹修改名称 */
collectionRouter.post('/rename', verifyAuth, verifyCollectionExist, rename)

/* 用户删除收藏夹 */
collectionRouter.post('/remove', verifyAuth, remove)


module.exports = collectionRouter