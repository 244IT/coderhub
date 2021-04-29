const Router = require("koa-router");
const { verifyAuth } = require("../middleware/auth.middleware");
const { verifyCollectionExist } = require('../middleware/collection.middleware')
const { user, moment } = require('../controller/collection.controller')


const collectionRouter = new Router({
    prefix: '/collection'
})


/* 用户添加收藏夹 */
collectionRouter.post('/user', verifyAuth, verifyCollectionExist, user)

/* 用户收藏文章 */
collectionRouter.post('/moment', verifyAuth, moment)



module.exports = collectionRouter