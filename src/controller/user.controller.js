const { create } = require('../service/user.service')

class UserController{
  // 用户注册控制层函数
  async create(ctx, next) {
    const user = ctx.request.body
    const result = await create(user)
    console.log('账号注册成功')
    ctx.body = result
  }
}

module.exports = new UserController()