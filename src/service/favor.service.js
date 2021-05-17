const connection = require('../app/database')
const { APP_HOST, APP_PORT } = require('../app/config')


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


    /* 获取用户点赞的动态 */
    async getMomentList(id, size, page) {
        const offset = (page - 1) * 10
        const statement = `
            SELECT m.id momentId, m.content, m.updateAt updateTime, m.createAt createTime, m.title, mf.createAt favorTime, 
            JSON_OBJECT('userId', u.id, 'userName', u.name, 'avatar', u.avatar_url) author,
            (SELECT COUNT(*) FROM comment c WHERE c.moment_id = m.id AND c.comment_id IS NULL) commentCount,
            (SELECT COUNT(*) FROM moment_favor uf WHERE uf.moment_id = m.id) favorCount,
            (
                    SELECT JSON_ARRAYAGG(CONCAT('${APP_HOST}:${APP_PORT}/moment/images/', file.filename))
                    FROM file
                    WHERE file.moment_id = m.id
            ) images,
            (SELECT JSON_ARRAYAGG(l.name)
                    FROM label_moment ml 
                    LEFT JOIN label l
                    ON ml.label_id = l.id
                    WHERE ml.moment_id = m.id
            ) labelList
            FROM moment m 
            LEFT JOIN user u
            ON m.user_id = u.id
            LEFT JOIN label_moment ml
            ON m.id = ml.moment_id
            RIGHT JOIN moment_favor mf
            ON m.id = mf.moment_id
            WHERE mf.user_id = ?
            ORDER BY mf.createAt DESC
            LIMIT ?, ?;
        `
        const [result] = await connection.execute(statement, [id, offset, size])
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