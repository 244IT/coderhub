const connection = require('../app/database')

class MomentService {
    /* 新增动态 */
    async create(userId, content, title) {
        const statement = `
            INSERT INTO moment (user_id, content, title) VALUES (?, ?, ?);
        `
        const result = await connection.execute(statement, [userId, content, title])
        return result
    }

    /* 获取动态详情 */
    async detail(momentId, id) {
        console.log(momentId, id)
        let arr = [momentId]
        let statement = `
            SELECT m.id momentId, m.content, m.updateAt updateTime, m.createAt createTime, m.title,
                JSON_OBJECT('userId', u.id, 'userName', u.name, 'avatar', u.avatar_url) author,
                (SELECT COUNT(*) FROM comment c WHERE c.moment_id = m.id AND c.comment_id IS NULL) commentCount,
                (SELECT COUNT(*) FROM moment_favor uf WHERE uf.moment_id = m.id) favorCount,
                (SELECT JSON_ARRAYAGG(CONCAT('http://localhost:8000/moment/images/', file.filename))
                    FROM file
                    WHERE file.moment_id = m.id
                ) images,
                (SELECT JSON_ARRAYAGG(l.name)
                    FROM moment_label ml 
                    LEFT JOIN label l
                    ON ml.label_id = l.id
                    WHERE ml.moment_id = m.id
                ) labelList
            FROM moment m
            LEFT JOIN user u
            ON m.user_id = u.id
            WHERE m.id = ?; 
        `
        if(id) {
            arr.unshift(id, id)
            statement = `
                SELECT m.id momentId, m.content, m.updateAt updateTime, m.createAt createTime, m.title,
                    JSON_OBJECT('userId', u.id, 'userName', u.name, 'avatar', u.avatar_url) author,
                    (SELECT COUNT(*) FROM comment c WHERE c.moment_id = m.id AND c.comment_id IS NULL) commentCount,
                    (SELECT COUNT(*) FROM moment_favor uf WHERE uf.moment_id = m.id) favorCount,
                    (SELECT COUNT(*) FROM moment_favor uf WHERE uf.moment_id = m.id AND uf.user_id = ?) isFavor,
                    (SELECT COUNT(*) FROM user_collection_moment ucf WHERE ucf.moment_id = m.id AND ucf.user_id = ?) isCollect,
                    (SELECT JSON_ARRAYAGG(CONCAT('http://localhost:8000/moment/images/', file.filename))
                        FROM file
                        WHERE file.moment_id = m.id
                    ) images,
                    (SELECT JSON_ARRAYAGG(l.name)
                        FROM moment_label ml 
                        LEFT JOIN label l
                        ON ml.label_id = l.id
                        WHERE ml.moment_id = m.id
                    ) labelList
                FROM moment m
                LEFT JOIN user u
                ON m.user_id = u.id
                WHERE m.id = ?; 
            `
        }
        console.log('查询')
        console.log(arr)
        const [[result]] = await connection.execute(statement, arr)
        console.log('结果')
        console.log(result)
        return result
    }

    /* 获取动态列表 */
    async list(size = 10, page = 1, keyword = '') {
        console.log('获取动态列表')
        console.log(keyword, size, page)
        const offset = (page - 1) * 10
        const statement = `
            SELECT m.id momentId, m.content, m.updateAt updateTime, m.createAt createTime, m.title, 
            JSON_OBJECT('userId', u.id, 'userName', u.name, 'avatar', u.avatar_url) author,
            (SELECT COUNT(*) FROM comment c WHERE c.moment_id = m.id AND c.comment_id IS NULL) commentCount,
            (SELECT COUNT(*) FROM moment_favor uf WHERE uf.moment_id = m.id) favorCount,
            (
                SELECT JSON_ARRAYAGG(CONCAT('http://localhost:8000/moment/images/', file.filename))
                FROM file
                WHERE file.moment_id = m.id
            ) images,
            (SELECT JSON_ARRAYAGG(l.name)
                FROM moment_label ml 
                LEFT JOIN label l
                ON ml.label_id = l.id
                WHERE ml.moment_id = m.id
            ) labelList
            FROM moment m 
            LEFT JOIN user u
            ON m.user_id = u.id
            WHERE m.title
            LIKE '%${keyword}%'
            ORDER BY createTime DESC
            LIMIT ?, ?;
        `
        const [result] = await connection.execute(statement, [offset, size])
        return result
    }
    /* 获取动态的标签 */
    async getLabel(momentId) {
        console.log('查询')
        const statement = `
            SELECT JSON_ARRAYAGG(l.name) labelList
            FROM moment_label ml 
            LEFT JOIN label l
            ON ml.label_id = l.id
            WHERE ml.moment_id = ?
        `
        const [[result]] = await connection.execute(statement, [momentId])
        return result
    }

    /* 修改动态的标签 */
    async updateLabel(momentId, labelId) {
        const statement = `
            UPDATE moment_label SET label_id = ? WHERE moment_id = ?;
        `
        const [result] = await connection.execute(statement, [labelId, momentId])
        return result
    }

    /* 获取用户的动态列表 */
    async userList(size = 10, page = 1, userId) {
        const offset = (page - 1) * 10
        const statement = `
            SELECT m.id momentId, m.content, m.updateAt updateTime, m.createAt createTime, m.title, 
            JSON_OBJECT('userId', u.id, 'userName', u.name, 'avatar', u.avatar_url) author,
            (SELECT COUNT(*) FROM comment c WHERE c.moment_id = m.id) commentCount,
            (
                SELECT JSON_ARRAYAGG(CONCAT('http://localhost:8000/moment/images/', file.filename))
                FROM file
                WHERE file.moment_id = m.id
            ) images,
            (SELECT JSON_ARRAYAGG(l.name)
                FROM moment_label ml 
                LEFT JOIN label l
                ON ml.label_id = l.id
                WHERE ml.moment_id = m.id
            ) labelList
            FROM moment m 
            LEFT JOIN user u
            ON m.user_id = u.id
            WHERE u.id = ?
            LIMIT ?, ?;
        `
        const [result] = await connection.execute(statement, [userId, offset, size])
        return result
    }

    /* 修改动态 */
    async update(momentId, content, title) {
        const statement = `
            UPDATE moment SET content = ?, title = ? WHERE id = ?;
        `
        const result = await connection.execute(statement, [content, title, momentId])
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

    /* 查询用户是否已经浏览过此文章 */

    /* 添加足迹 */
    async footprint(uid, momentId) {
        const statement = `
            INSERT INTO moment_footprint (user_id, moment_id) VALUES (?, ?);
        `
        const [result] = await connection.execute(statement, [uid, momentId])
        return result
    }

    /* 获取用户地 浏览记录 */
    async footprintList(id, size, page) {
        const offset = (page - 1) * 10
        const statement = `
            SELECT m.id momentId, m.content, m.updateAt updateTime, m.createAt createTime, m.title, mf.createAt favorTime, 
            JSON_OBJECT('userId', u.id, 'userName', u.name, 'avatar', u.avatar_url) author,
            (SELECT COUNT(*) FROM comment c WHERE c.moment_id = m.id AND c.comment_id IS NULL) commentCount,
            (SELECT COUNT(*) FROM moment_favor uf WHERE uf.moment_id = m.id) favorCount,
            (
                            SELECT JSON_ARRAYAGG(CONCAT('http://47.103.223.170:8000/moment/images/', file.filename))
                            FROM file
                            WHERE file.moment_id = m.id
            ) images,
            (SELECT JSON_ARRAYAGG(l.name)
                            FROM moment_label ml 
                            LEFT JOIN label l
                            ON ml.label_id = l.id
                            WHERE ml.moment_id = m.id
            ) labelList
            FROM moment m 
            LEFT JOIN user u
            ON m.user_id = u.id
            LEFT JOIN moment_label ml
            ON m.id = ml.moment_id
            RIGHT JOIN moment_footprint mf
            ON m.id = mf.moment_id
            WHERE mf.user_id = ?
            ORDER BY mf.updateAt DESC
            LIMIT ?, ?;
        `
        const [result] = await connection.execute(statement, [id, offset, size])
        return result
    }
}

module.exports = new MomentService()