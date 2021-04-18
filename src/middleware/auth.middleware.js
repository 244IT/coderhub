const jwt = require('jsonwebtoken')

const errorType = require('../constants/error-types')
const UserService = require('../service/user.service')
const AuthService = require('../service/auth.service')
const md5password = require('../utils/handle-password')
const { PUBLIC_KEY } = require('../app/config')

/* 验证登录权限 */
const verifyLogin = async (ctx, next) => {
  // 获取账号密码
  const { name, password } = ctx.request.body 
  
  // 判断账号密码是否为空
  if(!name || !password) {
    const error = new Error(errorType.NAME_OR_PASSWORD_IS_REQUIRED)
    return ctx.app.emit('error', error, ctx)
  }
  // 判断用户是否存在
  const result = await UserService.getUserByName(name)
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

/* 验证token权限 */
const verifyAuth = async (ctx, next) => {
  console.log('验证登录的middleware')
  console.log(ctx.header)
  // 获取token
  const authorization = ctx.header.authorization
  // 没有传token情况处理
  if(!authorization) {
    console.log('没传token')
    const error = new Error(errorType.UNAUTHORIZATION)
    return ctx.app.emit('error', error, ctx)
  }
  const token = authorization.replace('Bearer ', '')
  // 验证token合法性
  try {
    console.log('验证登录合法性')
    const result = jwt.verify(token, PUBLIC_KEY, {
      algorithms: ['RS256']
    })
    console.log('合法')
    ctx.user = result
    console.log(ctx.user)
    await next()
  } catch(err) {
    console.log('不合法')
    const error = new Error(errorType.UNAUTHORIZATION)
    return ctx.app.emit('error', error, ctx)
  }
}

/* 验证资源修改权限 */
const verifyPermission = async (ctx, next) => {
  console.log('验证资源修改的middleware')
  // 获取要验证的表名和资源id
  const [ resourceKey ] = Object.keys(ctx.params)
  const tableName = resourceKey.replace('Id', '')
  const resourceId = ctx.params[resourceKey]
  // 获取用户的id
  const { id } = ctx.user
  // 查询此用户是否有修改的权限
  try {
    let result = await AuthService.checkSource(id, resourceId, tableName)
    console.log(result)
    if(!result) {
      throw new Error()
    }
    console.log('资源修改验证成功')
    await next()
  }catch(err) {
    const error = new Error(errorType.UNPERMISSION)
    return ctx.app.emit('error', error, ctx)
  }
}

module.exports = {
  verifyLogin,
  verifyAuth,
  verifyPermission,
}