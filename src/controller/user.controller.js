const fs = require('fs')

const { create } = require('../service/user.service')
const { getAvatarByUserId } = require('../service/file.service')
const UserService = require('../service/user.service')

const { AVATAR_PATH } = require('../constants/file-paths')
class UserController{
  /* 用户注册 */
  async create(ctx, next) {
    const user = ctx.request.body
    const result = await create(user)
    ctx.body = {
      status: '10000',
      message: '注册成功'
    }
  }

  /* 获取头像 */
  async avatarInfo(ctx, next) {
    console.log('获取用户头像')
    const { userId } = ctx.params
    const avatarInfo = await getAvatarByUserId(userId)
    console.log(avatarInfo)
    if(!avatarInfo) {
      const error = new Error()
      return ctx.app.emit('error', error, ctx)
    }
    /* 提供图像信息 */
    ctx.response.set('content-type', avatarInfo.mimetype)
    ctx.body = fs.createReadStream(`${AVATAR_PATH}/${avatarInfo.filename}`);
  }

  /* 修改用户信息 */
  async update(ctx, next) {
    // 获取参数
    const { name, sign } = ctx.request.body
    const { id } = ctx.user
    // 修改用户信息
    const result = await UserService.updateUserInfo(name, sign, id)
    console.log(result)
    ctx.body = {
      message: '修改成功',
      status: '10000'
    }

  }  
}

module.exports = new UserController()