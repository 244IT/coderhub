const Router = require('koa-router')

const { verifyAuth, verifyPermission } = require('../middleware/auth.middleware') 
const { create, reply, update, remove, list } = require('../controller/comment.controller.js')

const commentRouter = new Router({
  prefix: '/comment'
})
/* 发表评论接口 */
commentRouter.post('/', verifyAuth, create)
/* 回复评论接口 */
commentRouter.post('/reply/:commentId', verifyAuth, reply)
/* 修改评论接口 */
commentRouter.patch('/:commentId', verifyAuth, verifyPermission, update)
/* 删除评论接口 */
commentRouter.delete('/:commentId', verifyAuth, verifyPermission, remove)
/* 获取评论列表接口 */
commentRouter.get('/', list)

module.exports = commentRouter