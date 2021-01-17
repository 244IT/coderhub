const connection = require('../app/database')

class MomentService {
    /* 新增动态 */
    async create(userId, content) {
        const statement = `
            INSERT INTO moment (user_id, content) VALUES (?, ?);
        `
        const result = await connection.execute(statement, [userId, content])
        return result
    }

    /* 获取动态详情 */
    async detail(momentId) {
        console.log(momentId)
        const statement = `
            SELECT m.id momentId, m.content, m.updateAt updateTime, m.createAt createTime, JSON_OBJECT('userId', u.id, 'userName', u.name) author
            FROM moment m
            LEFT JOIN user u
            ON m.user_id = u.id
            WHERE m.id = ?; 
        `
        const [[result]] = await connection.execute(statement, [momentId])
        return result
    }

    /* 获取动态列表 */
    async list(size = 10, page = 1) {
        const offset = (page - 1) * 10
        const statement = `
            SELECT m.id momentId, m.content, m.updateAt updateTime, m.createAt createTime, 
            JSON_OBJECT('userId', u.id, 'userName', u.name) author,
            (SELECT COUNT(*) FROM comment c WHERE c.moment_id = m.id) commentCount 
            FROM moment m
            LEFT JOIN user u
            ON m.user_id = u.id
            LIMIT ?, ?;
        `
        const [result] = await connection.execute(statement, [offset, size])
        return result
    }

    /* 修改动态 */
    async update(momentId, content) {
        const statement = `
            UPDATE moment SET content = ? WHERE id = ?;
        `
        const result = await connection.execute(statement, [content, momentId])
        return result
    }

    /* 删除动态 */
    async remove(momentId) {
        const statement = `
            DELETE FROM moment WHERE id = ?;
        `
        const result = await connection.execute(statement, [momentId])
        return result
    }

    /* 获取动态和标签的关系 */
    async getConnection(momentId, labelId) {
        const statement = `
            SELECT * FROM moment_label WHERE moment_id = ? AND label_id = ?
        `
        const [result] = await connection.execute(statement, [momentId, labelId])
        return result
    }

    /* 添加动态和标签的关系 */
    async addConnection(momentId, labelId) {
        const statement = `
            INSERT INTO moment_label (moment_id, label_id) VALUES (?, ?);
        `
        const [result] = await connection.execute(statement, [momentId, labelId])
        return result
    }
}

module.exports = new MomentService()