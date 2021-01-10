const errorType = require('../constants/error-types')
const service = require('../service/user.service')
const md5password = require('../utils/handle-password')

/* 校验账号账号密码中间件 */
const verifyUser = async (ctx, next) => {

  // 获取用户的昵称和密码
  const { name, password } = ctx.request.body

  // 判断用户账号密码是否为空
  if(!name || !password) {
    const error = new Error(errorType.NAME_OR_PASSWORD_IS_REQUIRED)
    return ctx.app.emit('error', error, ctx)
  }

  // 判断是否已经存在此账号
  const result = await service.getUserByName(name)
  console.log(result)
  if(result.length) {
    const error = new Error(errorType.USER_ALREADT_EXIST)
    return ctx.app.emit('error', error, ctx)
  }

  await next()
}

/* 密码加密处理 */
const handlePassword = async (ctx, next) => {
  // 取到密码
  const { password } = ctx.request.body
  console.log('密码' + password)

  ctx.request.body.password = md5password(password)
  await next()
}

module.exports = {
  verifyUser,
  handlePassword
}