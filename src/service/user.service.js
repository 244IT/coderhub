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

  // 保存头像信息
  async updateUserAvatar(avatarUrl, userId) {
    const statement = `
      UPDATE user SET avatar_url = ? WHERE id = ?
    `

    const result = await connection.execute(statement, [avatarUrl, userId])
    return result
  }

  /* 修改用户信息 */
  async updateUserInfo(name, sign, id) {
    let statement 
    if(name && sign) {
      statement = `
        UPDATE user SET name = ?, sign = ? WHERE id = ?
      `
    }else if(sign){
      statement = `
        UPDATE user SET sign = ? WHERE id = ?
      `
    }else {
      statement = `
        UPDATE user SET name = ? WHERE id = ?
      `
    }
    const paramsArr = [name, sign, id].filter(item => item)
    const result = await connection.execute(statement, paramsArr)
    return result
  }

  /* 修改用户密码 */
  async updatePassword(newPassword, name) {
    console.log('修改密码service')
    const statement = `
      UPDATE user SET password = ? WHERE name = ?
    `
    const result = await connection.execute(statement, [newPassword, name])
    console.log(result)
    return result
  }

  /* 根据用户名获取密码 */
  async getPasswordByUsername(name) {
    console.log('name' + name)
    const statement = `
      SELECT * FROM user WHERE name = ?;
    `
    const [[result]] = await connection.execute(statement, [name])
    return result
  }
}

module.exports = new UserService()