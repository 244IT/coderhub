const Router = require('koa-router')

const { verifyAuth } = require('../middleware/auth.middleware')
const { create, list, momentList } = require('../controller/label.controller.js')

const labelRouter = new Router({
  prefix: '/label'
})

/* 创建标签接口 */
labelRouter.post('/', verifyAuth, create)
/* 获取标签列表 */
labelRouter.get('/', list)
/* 获取指定标签下的动态 */
labelRouter.get('/:labelId', momentList)

module.exports = labelRouter