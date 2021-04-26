const Router = require('koa-router')

const { verifyAuth } = require('../middleware/auth.middleware')
const { moment, comment, getMomentList } = require('../controller/favor.controller.js')

const favorRouter = new Router({
  prefix: '/favor'
})

// 文章点赞接口
favorRouter.post('/moment', verifyAuth, moment)

// 评论点赞接口
favorRouter.post('/comment', verifyAuth, comment)

// 获取用户点赞的文章
favorRouter.get('/getMomentList', verifyAuth, getMomentList)


module.exports = favorRouter


