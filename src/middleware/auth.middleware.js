const jwt = require('jsonwebtoken')

const errorType = require('../constants/error-types')
const service = require('../service/user.service')
const md5password = require('../utils/handle-password')
const { PUBLIC_KEY } = require('../app/config')

const verifyLogin = async (ctx, next) => {
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

  ctx.user = user

  await next()
}

/* 登录验证 */
const verifyAuth = async (ctx, next) => {
  console.log('验证登录的middleware')
  console.log(ctx.header)
  // 获取token
  const authorization = ctx.header.authorization
  // 没有传token情况处理
  if(!authorization) {
    const error = new Error(errorType.UNAUTHORIZATION)
    return ctx.app.emit('error', error, ctx)
  }
  const token = authorization.replace('Bearer ', '')
  // 验证token合法性
  try {
    const result = jwt.verify(token, PUBLIC_KEY, {
      algorithms: ['RS256']
    })
    ctx.user = result
    await next()
  } catch(err) {
    const error = new Error(errorType.UNAUTHORIZATION)
    return ctx.app.emit('error', error, ctx)
  }
}

module.exports = {
  verifyLogin,
  verifyAuth
}