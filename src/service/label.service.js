const connection = require('../app/database')
const { APP_HOST, APP_PORT } = require('../app/config')

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
  async list(size, page, id) {
    const offset = (page - 1) * size
    let statement = `
      SELECT l.id, l.name, l.img_url
      FROM label l
      LIMIT ?, ?;
    `
    let arr = [offset, size]
    if(id) {
      statement = `
        SELECT l.id, l.name, l.img_url, (IF(l.id IN (SELECT ul.label_id FROM user_label ul WHERE ul.user_id = ?), 1, 0)) follow FROM label l LIMIT ?, ?;
      `
      arr.unshift(id)
    }
    const [result] = await connection.execute(statement, arr)
    return result
  }

  /* 获取用户关注的标签列表 */
  async user(page, size, id) {
    const offset = (page - 1) * size
    const statement = `
      SELECT l.id, l.name, l.img_url, IF(ul.user_id, 1, 0) follow
      FROM user_label ul
      LEFT JOIN user u 
      ON u.id = ul.user_id
      LEFT JOIN label l
      ON ul.label_id = l.id
      WHERE ul.user_id = ?
      LIMIT ?, ?;
    `
    const [result] = await connection.execute(statement, [id, offset, size])
    return result
  }

  /* 获取标签下的动态 */
  async getMomentListByLabelId(labelId, size, page) {
    const offset = (page - 1) * 10
    const statement = `
        SELECT m.id momentId, m.content, m.updateAt updateTime, m.createAt createTime, m.title, 
        JSON_OBJECT('userId', u.id, 'userName', u.name, 'avatar', u.avatar_url) author,
        (SELECT COUNT(*) FROM comment c WHERE c.moment_id = m.id) commentCount,
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
        WHERE ml.label_id = ?
        LIMIT ?, ?;
    `
    const result = await connection.execute(statement, [labelId, offset, size])
    return result
  }
  /* 查询用户是否已经关注标签 */
  async isUserFollow(userId, labelId) {
    const statement = `
      SELECT l.id, l.name, l.img_url, IF(ul.user_id, 1, 0) follow
      FROM label l
      LEFT JOIN user_label ul
      ON l.id = ul.label_id
      LEFT JOIN user u
      ON ul.user_id = u.id
      WHERE ul.user_id = ? AND ul.label_id = ?
    `
    const [[result]] = await connection.execute(statement, [userId, labelId])
    return result
  }

  /* 关注标签 */
  async followLabel(userId, labelId) {
    const statement = `
      INSERT INTO user_label (user_id, label_id) VALUES (?, ?);
    `
    const result = await connection.execute(statement, [userId, labelId])
    return result
  }

  /* 取消关注标签 */
  async unfollowLabel(userId, labelId) {
    const statement = `
      DELETE FROM user_label WHERE user_id = ? AND label_id = ?
    `
    const result = await connection.execute(statement, [userId, labelId])
    return result
  }
}

module.exports = new LabelService()