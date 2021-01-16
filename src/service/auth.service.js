const connection = require('../app/database')

class AuthService{
  async checkSource(userId, SourceId, tableName) {
    const statement = `
      SELECT * FROM ${tableName}
      WHERE id = ? AND user_id = ?;
    `
    const [result] = await connection.execute(statement, [SourceId, userId])
    return result.length ? true : false
  }
}

module.exports = new AuthService()