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
  async reply(userId, momentId, content, commentId, replyCommentId) {
    const statement = `
      INSERT INTO comment (content, user_id, moment_id, comment_id, reply_comment_id) VALUES (?, ?, ?, ?, ?);
    `
    const result = await connection.execute(statement, [content, userId, momentId, commentId, replyCommentId])
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
  async getCommentsByMomentId(momentId, id) {
    let arr = [momentId]
    let statement = `
      SELECT 
      c.id commentId, content, c.comment_id replyCommentId, c.moment_id momentId, c.createAt replyTime,
      JSON_OBJECT('id', u.id, 'name', u.name, 'avatar', u.avatar_url) user,
      (SELECT COUNT(*) FROM comment cm WHERE c.id = cm.reply_comment_id) replyCount,
      (SELECT COUNT(*) FROM comment_favor cf WHERE cf.comment_id = c.id) favorCount,
      (
        SELECT 
        JSON_ARRAYAGG(
          JSON_OBJECT('commentId', com.id, 'content', com.content, 'replyCommentId', com.comment_id, 'momentId', com.moment_id, 'replyTime', com.createAt, 'user', 
            JSON_OBJECT('id', usr.id, 'name', usr.name, 'avatar', u.avatar_url), 'replyUser', 
            (
              SELECT 
              JSON_OBJECT('id', rusr.id, 'name', rusr.name, 'avatar', u.avatar_url)
              FROM comment rcom
              LEFT JOIN user rusr
              ON rcom.user_id = rusr.id
              WHERE rcom.id = com.comment_id
            )
          )
        ) 
        FROM comment com 
        LEFT JOIN user usr
        ON com.user_id = usr.id
        WHERE com.reply_comment_id = c.id
      ) replyList
      FROM comment c
      LEFT JOIN user u 
      ON c.user_id = u.id
      WHERE c.moment_id = ? AND c.comment_id IS NULL; 
    `

    if(id) {
      arr.unshift(id)
      statement = `
        SELECT 
        c.id commentId, content, c.comment_id replyCommentId, c.moment_id momentId, c.createAt replyTime,
        JSON_OBJECT('id', u.id, 'name', u.name, 'avatar', u.avatar_url) user,
        (SELECT COUNT(*) FROM comment cm WHERE c.id = cm.reply_comment_id) replyCount,
        (SELECT COUNT(*) FROM comment_favor cf WHERE cf.comment_id = c.id) favorCount,
        (SELECT COUNT(*) FROM comment_favor cf WHERE cf.comment_id = c.id AND cf.user_id = ?) isFavor,
        (
          SELECT 
          JSON_ARRAYAGG(
            JSON_OBJECT('commentId', com.id, 'content', com.content, 'replyCommentId', com.comment_id, 'momentId', com.moment_id, 'replyTime', com.createAt, 'user', 
              JSON_OBJECT('id', usr.id, 'name', usr.name, 'avatar', u.avatar_url), 'replyUser', 
              (
                SELECT 
                JSON_OBJECT('id', rusr.id, 'name', rusr.name, 'avatar', u.avatar_url)
                FROM comment rcom
                LEFT JOIN user rusr
                ON rcom.user_id = rusr.id
                WHERE rcom.id = com.comment_id
              )
            )
          ) 
          FROM comment com 
          LEFT JOIN user usr
          ON com.user_id = usr.id
          WHERE com.reply_comment_id = c.id
        ) replyList
        FROM comment c
        LEFT JOIN user u 
        ON c.user_id = u.id
        WHERE c.moment_id = ? AND c.comment_id IS NULL; 
      `
    }
    
    const [result] = await connection.execute(statement, arr)
    return result
  }
}

module.exports = new CommentService()