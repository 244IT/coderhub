const jwt = require('jsonwebtoken')
const { PRIVATE_KEY } = require('../app/config')

class AuthController{
  /* 用户登录控制层函数 */
  async login(ctx, next) {
    console.log(ctx.user)
    const { name, id } = ctx.user
    const token = jwt.sign({id, name}, PRIVATE_KEY, {
      expiresIn: 60 * 60 * 24, // 过期时间
      algorithm: 'RS256' // 使用的算法
    })
    ctx.body = {
      id,
      name,
      token
    }
  }

  /* 登录成功 */
  async success(ctx, next) {
    console.log(ctx.user)
    ctx.body = "授权成功"
  }
}

module.exports = new AuthController()