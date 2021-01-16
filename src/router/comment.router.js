const Router = require('koa-router')

const { verifyAuth, verifyPermission } = require('../middleware/auth.middleware') 
const { create, reply, update, remove, list } = require('../controller/comment.controller.js')

const CommentRouter = new Router({
  prefix: '/comment'
})
/* 发表评论接口 */
CommentRouter.post('/', verifyAuth, create)
/* 回复评论接口 */
CommentRouter.post('/reply/:commentId', verifyAuth, reply)
/* 修改评论接口 */
CommentRouter.patch('/:commentId', verifyAuth, verifyPermission, update)
/* 删除评论接口 */
CommentRouter.delete('/:commentId', verifyAuth, verifyPermission, remove)
/* 获取评论接口 */
CommentRouter.get('/', list)

module.exports = CommentRouter