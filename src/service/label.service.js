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
}

module.exports = new LabelService()