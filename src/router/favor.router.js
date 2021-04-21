const Router = require('koa-router')

const { verifyAuth } = require('../middleware/auth.middleware')
const { moment } = require('../controller/favor.controller.js')

const labelRouter = new Router({
  prefix: '/favor'
})

// 文章点赞接口
labelRouter.post('/moment', verifyAuth, moment)


module.exports = labelRouter


