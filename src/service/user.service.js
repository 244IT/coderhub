const connection = require('../app/database')

class UserService{
  // 数据库创建用户
  async create(user) {
    const { name, password } = user
    const statement = `INSERT INTO user (name, password) VALUES (?, ?);`
    const result = await connection.execute(statement, [name, password])
    return result
  }

  // 数据库查询用户
  async getUserByName(name) {
    const statement = `SELECT * FROM user WHERE name = ?;`
    const result = await connection.execute(statement, [name])
    return result[0] // result[0]存储用户信息，每个用户信息用对象表示
  }
}

module.exports = new UserService()