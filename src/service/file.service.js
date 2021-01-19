const connection = require('../app/database')

class FileService {
  /* 保存用户的头像信息 */
  async createAvatar(mimetype, filename, size, userId) {
    const statement = `
      INSERT INTO avatar (filename, mimetype, size, user_id) VALUES (?, ?, ?, ?)
    `
    const result = await connection.execute(statement, [filename, mimetype, size, userId])
    return result
  }

  /* 获取头像 */
  async getAvatarByUserId(userId) {
    const statement = `
      SELECT * FROM avatar WHERE user_id = ?
    `

    const [[result]] = await connection.execute(statement, [userId])
    return result
  }
}

module.exports = new FileService()