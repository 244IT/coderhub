const connection = require('../app/database')

class LabelService {
  /* 创建标签 */
  async create(name) {
    const statement = `
      INSERT INTO label (name) VALUES (?);
    `
    const [result] = await connection.execute(statement, [name])
    return result
  }

  /* 通过标签名查询标签 */
  async getLabelByName(name) {
    const statement = `
      SELECT * FROM label WHERE name = ?
    `
    const [result] = await connection.execute(statement, [name])
    return result
  }

  /* 获取标签列表 */
  async list(size, page) {
    const offset = (page - 1) * 10
    const statement = `
      SELECT * FROM label LIMIT ?, ?;
    `
    const [result] = await connection.execute(statement, [offset, size])
    return result
  }

  /* 获取标签下的动态 */
  async getMomentListByLabelId(labelId, size, page) {
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
        LEFT JOIN moment_label ml
        ON m.id = ml.moment_id
        WHERE ml.label_id = ?
        LIMIT ?, ?;
    `
    const result = await connection.execute(statement, [labelId, offset, size])
    return result
  }
}

module.exports = new LabelService()