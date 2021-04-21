const connection = require('../app/database')

class FavorService{

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
}

module.exports = new FavorService()