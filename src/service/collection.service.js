const connection = require('../app/database')
const { APP_HOST, APP_PORT } = require('../app/config')

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
            SELECT uc.user_id FROM user_collection uc 
            WHERE user_id = ? AND collection_id = ?;
        `
        const [result] = await connection.execute(statement, [uid, id])
        console.log(result)
        return result 
    }

    /* 查询此用户是否已经收藏此文章 */
    async getCollectioMomentByUser(momentId, uid, collectionId) {
        console.log(momentId, uid, collectionId)
        const statement = `
            SELECT cm.moment_id 
            FROM collection_moment cm
            WHERE moment_id = ? AND user_id = ?;
        `
        const [result] = await connection.execute(statement, [momentId, uid])
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

    /* 用户添加收藏夹 */
    async user(id, uid) {
        const statement = `
            INSERT INTO user_collection (user_id, collection_id) VALUES (?, ?);
        `
        const [result] = await connection.execute(statement, [uid, id])
        return result
    }

    /* 用户收藏文章 */
    async collectionMoment(momentId, uid, collectionId) {
        const statement = `
            INSERT INTO collection_moment (user_id, collection_id, moment_id) 
            VALUES (?, ?, ?);
        `
        const [result] = await connection.execute(statement, [uid, collectionId, momentId])
        console.log(result)
        return result
    }

    /* 用户取消收藏文章 */
    async noCollectionMoment(momentId, uid) {
        const statement = `
            DELETE FROM collection_moment
            WHERE moment_id = ? AND user_id = ?;
        `
        const [result] = await connection.execute(statement, [momentId, uid])
        console.log(result)
        return result
    }

    /* 获取用户的收藏夹 */
    async list(uid) {
        const statement = `
            SELECT u.id uid, c.id collectionId, c.name, 
                (SELECT COUNT(*) FROM collection_moment cm WHERE cm.user_id = u.id AND cm.collection_id = c.id) momentCount
            FROM user_collection uc
            LEFT JOIN user u
            ON uc.user_id = u.id
            LEFT JOIN collection c
            ON uc.collection_id = c.id
            WHERE u.id = ?
            ORDER BY c.createAt DESC;
        `
        const [result] = await connection.execute(statement, [uid])
        return result
    }

    /* 获取用户某个收藏夹下的文章 */
    async momentList(id, collectionId) {
        const statement = `
            SELECT m.id momentId, m.content, m.updateAt updateTime, m.createAt createTime, m.title,
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
            RIGHT JOIN collection_moment cm
            ON m.id = cm.moment_id
            WHERE cm.user_id = ? AND collection_id = ?
            ORDER BY cm.createAt DESC;
        `

        const [result] = await connection.execute(statement, [id, collectionId])
        return result
    }

    /* 获取这个收藏夹名称被几个用户所取名 */
    async getCollectionCount(name) {
        console.log('获取这个收藏夹名称被几个用户所取名:' + name)
        const statement = `
            SELECT COUNT(uc.user_id) count, (SELECT id FROM collection WHERE name = ?) id FROM collection c
            LEFT JOIN user_collection uc
            ON c.id = uc.collection_id
            WHERE name = ?;
        ` 

        const [[result]] = await connection.execute(statement, [name, name])
        console.log(result)
        return result
    }

    /* 修改用户收藏夹的id为新收藏夹的id */
    async updateUserCollection(nId, oId, uid) {
        console.log(nId, oId, uid)
        const statement = `
            UPDATE user_collection uc SET uc.collection_id = ? WHERE uc.user_id = ? AND uc.collection_id = ?;
        `
        const [result] = await connection.execute(statement, [nId, uid, oId])
        return result
    }

    /* 修改收藏夹的名称 */
    async rename(oName, nName) {
        console.log('修改收藏夹名称')
        console.log(oName, nName)
        const statement = `
            UPDATE collection SET name = ? WHERE name = ?
        `

        const [result] = await connection.execute(statement, [nName, oName])
        return result
    }

    /* 删除收藏夹 */
    async removeCollection(uid, collectionId) {
        const statement = `
            DELETE FROM user_collection WHERE user_id = ? AND collection_id = ?;
        `
        await connection.execute(statement, [uid, collectionId])

    }

    /* 删除收藏夹下的文章 */
    async removeCollectionMoment(uid, collectionId, momentId) {
        let statement = `
            DELETE FROM collection_moment WHERE user_id = ? AND collection_id = ?;
        `
        let arr = [uid, collectionId]
        if(momentId && momentId !== 'undefined') {
            arr.push(momentId)
            statement = `
                DELETE FROM collection_moment 
                WHERE user_id = ? AND collection_id = ? AND moment_id = ?;
            `
        }
        const result = await connection.execute(statement, arr)
        return result
    }
}

module.exports = new CollectionService()