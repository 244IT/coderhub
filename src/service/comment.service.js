const connection = require('../app/database')

class CommentService {
  /* 创建评论 */
  async create(userId, momentId, content) {
    const statement = `
      INSERT INTO comment (content, user_id, moment_id) VALUES (?, ?, ?);
    `
    const [result] = await connection.execute(statement, [content, userId, momentId])
    return result
  }

  /* 回复评论 */
  async reply(userId, momentId, content, commentId) {
    const statement = `
      INSERT INTO comment (content, user_id, moment_id, comment_id) VALUES (?, ?, ?, ?);
    `
    const result = await connection.execute(statement, [content, userId, momentId, commentId])
    return result
  }

  /* 修改评论 */
  async update(commentId, content) {
    const statement = `
      UPDATE comment SET content = ? WHERE id = ?;
    `
    const result = await connection.execute(statement, [content, commentId])
    return result
  }

  /* 删除评论 */
  async remove(commentId) {
    console.log(commentId)
    const statement = `
      DELETE FROM comment WHERE id = ?
    `
    const result = await connection.execute(statement, [commentId])
    return result
  }

  /* 根据动态id获取评论列表 */
  async getCommentsByMomentId(momentId) {
    const statement = `
      SELECT c.id commentId, content, c.comment_id replyCommentId, c.createAt createTime,
      JSON_OBJECT('id', u.id, 'name', u.name) user
      FROM comment c
      LEFT JOIN user u
      ON c.user_id = u.id
      WHERE moment_id = ?;
    `
    const [result] = await connection.execute(statement, [momentId])
    return result
  }
}

module.exports = new CommentService()