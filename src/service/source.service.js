const connection = require('../app/database')

class SourceService {
    async getMoment(userId, momentId) {
        console.log(userId, momentId)
        const statement = `
            SELECT m.id momentId, m.content, m.updateAt updateTime, m.createAt createTime, JSON_OBJECT('userId', u.id, 'userName', u.name) author
            FROM moment m
            LEFT JOIN user u
            ON m.user_id = u.id
            WHERE m.id = ?
            AND u.id = ?;
        `
        const [result] = await connection.execute(statement, [momentId, userId])
        return result.length ? true : false
    }
}

module.exports = new SourceService()