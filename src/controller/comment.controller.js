const CommentService = require('../service/comment.service.js')

class CommentController{
  /* 发表评论 */
  async create(ctx, next) {
    // 获取用户id，动态id，评论内容
    const { id } = ctx.user
    const { content, momentId } = ctx.request.body

    // 创建评论
    const result = await CommentService.create(id, momentId, content)
    console.log('创建评论成功')
    console.log(result)
    ctx.body = {
      data: {
        commentId: result.insertId
      },
      message: '评论成功',
      status: '10000'
    }
  }

  /* 回复评论 */
  async reply(ctx, next) {
    // 获取用户id，动态id，回复评论内容，回复的评论id
    const { id } = ctx.user
    const { commentId } = ctx.params
    const { momentId, content, replyCommentId } = ctx.request.body

    // 创建评论
    const [result] = await CommentService.reply(id, momentId, content, commentId, replyCommentId)
    console.log('回复评论')
    console.log(result)
    
    ctx.body = {
      data: {
        commentId: result.insertId
      },
      message: '回复评论成功',
      status: '10000',
    }
  }

  /* 修改评论 */
  async update(ctx, next) {
    // 获取评论id，修改评论的内容
    const { content } = ctx.request.body
    const { commentId } = ctx.params
    // 修改评论
    const result = await CommentService.update(commentId, content)
    ctx.body = result
  } 

  /* 删除评论 */
  async remove(ctx, next) {
    // 获取评论的id
    const { commentId } = ctx.params
    console.log(commentId)
    // 删除评论
    const result = await CommentService.remove(commentId)
    ctx.body = result
  }

  /* 获取动态下的评论列表 */
  async list(ctx, next) {
    // 获取动态的id
    const { momentId } = ctx.request.query
    // 根据动态id获取评论列表
    const result = await CommentService.getCommentsByMomentId(momentId)
    ctx.body = {
      data: result,
      message: 'SUCCESS',
      status: '10000'
    }
  }
} 

module.exports = new CommentController()