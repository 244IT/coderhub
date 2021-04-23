const connection = require('../app/database')

class FavorService{

    /* -----------------------------------------动态相关------------------------------------------- */
    /* 动态点赞 */
    async favorMoment(userId, momentId) {
        const statement = `
            INSERT INTO moment_favor (user_id, moment_id) VALUES(?, ?)
        `
        const result = await connection.execute(statement, [userId, momentId])
        return result
    }

    /* 动态取消点赞 */
    async disfavorMoment(userId, momentId) {
        const statement = `
            DELETE FROM moment_favor WHERE user_id = ? AND moment_id = ?;
        `
        const result = await connection.execute(statement, [userId, momentId])
        return result
    }

    /* 查询用户是否已经点赞文章了 */
    async isMomentFavor(userId, momentId) {
        const statement = `
            SELECT *
            FROM moment_favor mf
            WHERE mf.user_id = ? AND mf.moment_id = ?;
        `
        const [[result]] = await connection.execute(statement, [userId, momentId])
        return result
    }

    /* ---------------------------------------------评论相关--------------------------------------------- */

    /* 评论点赞 */
    async favorComment(userId, commentId) {
        const statement = `
            INSERT INTO comment_favor (user_id, comment_id) VALUES(?, ?)
        `
        const result = await connection.execute(statement, [userId, commentId])
        return result
    }

    /* 评论取消点赞 */
    async disfavorComment(userId, commentId) {
        const statement = `
            DELETE FROM comment_favor WHERE user_id = ? AND comment_id = ?;
        `
        const result = await connection.execute(statement, [userId, commentId])
        return result
    }

    /* 查询用户是否已经点赞评论了 */
    async isCommentFavor(userId, commentId) {
        const statement = `
            SELECT *
            FROM comment_favor cf
            WHERE cf.user_id = ? AND cf.comment_id = ?;
        `
        const [[result]] = await connection.execute(statement, [userId, commentId])
        return result
    }
}

module.exports = new FavorService()