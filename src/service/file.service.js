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

  /* 保存动态配图 */
  async createPicture(mimetype, filename, size, userId, momentId) {
    const statement = `
      INSERT INTO file (filename, mimetype, size, user_id, moment_id) VALUES (?, ?, ?, ?, ?)
    `
    const result = await connection.execute(statement, [filename, mimetype, size, userId, momentId])
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

  /* 获取动态配图 */
  async getFileByFileName(filename) {
    const statement = `
      SELECT * FROM file WHERE filename = ?
    `

    const [[result]] = await connection.execute(statement, [filename])
    return result
  }
}

module.exports = new FileService()