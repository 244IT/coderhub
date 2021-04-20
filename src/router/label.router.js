const Router = require('koa-router')

const { verifyAuth } = require('../middleware/auth.middleware')
const { create, list, momentList, follow } = require('../controller/label.controller.js')

const labelRouter = new Router({
  prefix: '/label'
})

/* 创建标签接口 */
labelRouter.post('/', verifyAuth, create)
/* 获取标签列表 */
labelRouter.get('/', list)
/* 获取指定标签下的标签 */
labelRouter.get('/:labelId', momentList)
/* 用户关注，取消关注标签 */
labelRouter.post('/follow', verifyAuth, follow)


module.exports = labelRouter