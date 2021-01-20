const { createAvatar } = require('../service/file.service.js')
const { updateUserAvatar } = require('../service/user.service')

const { APP_HOST, APP_PORT } = require('../app/config')

class FileController {
  /* 头像上传 */
  async saveAvatarInfo(ctx, next) {
    const { id } = ctx.user
    const { mimetype, filename, size } = ctx.req.file
    // 保存到数据库中
    await createAvatar(mimetype, filename, size, id)
    // 保存到user表中
    try{
      const avatarUrl = `${APP_HOST}:${APP_PORT}/user/${id}/avatar`
      await updateUserAvatar(avatarUrl, id)
    }catch(err) {
      console.log(err)
    }
    ctx.body = '上传头像成功'
  }
}

module.exports = new FileController()