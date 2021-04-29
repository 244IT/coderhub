const connection = require('../app/database')

class CollectionService{

    /* 通过收藏夹名称获取收藏夹 */
    async getCollectionByName(name) {
        const statement = `
            SELECT c.id FROM collection c WHERE name = ?
        `

        const [result] = await connection.execute(statement, [ name ])
        return result
    }

    /* 查询此用户是否已经有此收藏夹 */
    async getCollectionByUser(uid, id) {
        const statement = `
            SELECT uc.user_id FROM user_collection uc WHERE user_id = ? AND collection_id = ?;
        `
        const [result] = await connection.execute(statement, [ uid, id ])
        console.log(result)
        return result 
    }

    /* 创建收藏夹 */
    async create(name) {
        const statement = `
            INSERT INTO collection (name) VALUES (?);
        `
        const [result] = await connection.execute(statement, [ name ])
        return result
    }

    /* 用户添加受参加 */
    async user(id, uid) {
        const statement = `
            INSERT INTO user_collection (user_id, collection_id) VALUES (?, ?)
        `
        const [result] = await connection.execute(statement, [ uid, id ])
        return result
    }

}

module.exports = new CollectionService()