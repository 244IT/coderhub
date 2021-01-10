const errorType = require('../constants/error-types')
const service = require('../service/user.service')
const md5password = require('../utils/handle-password')

class AuthMiddleware{
  async verifyLogin(ctx, next) {
    // 获取账号密码
    const { name, password } = ctx.request.body 
    
    // 判断账号密码是否为空
    if(!name || !password) {
      const error = new Error(errorType.NAME_OR_PASSWORD_IS_REQUIRED)
      return ctx.app.emit('error', error, ctx)
    }
    // 判断用户是否存在
    const result = await service.getUserByName(name)
    const user = result[0]
    console.log(user)
    if(!user) {
      const error = new Error(errorType.USER_DOSE_NOT_EXIST)
      return ctx.app.emit('error', error, ctx)
    }
    // 判断密码是否错误
    if(md5password(password) !== user.password) {
      const error = new Error(errorType.PASSWORD_ERROR)
      return ctx.app.emit('error', error, ctx)
    }

    await next()
  }
}

module.exports = new AuthMiddleware()