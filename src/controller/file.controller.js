const FileService = require('../service/file.service.js')
const { updateUserAvatar } = require('../service/user.service')

const { APP_HOST, APP_PORT } = require('../app/config')

class FileController {
  /* 头像上传 */
  async saveAvatarInfo(ctx, next) {
    const { id } = ctx.user
    const { mimetype, filename, size } = ctx.req.file
    // 保存到数据库中
    await FileService.createAvatar(mimetype, filename, size, id)
    // 保存到user表中
    try{
      const avatarUrl = `${APP_HOST}:${APP_PORT}/user/${id}/avatar`
      await updateUserAvatar(avatarUrl, id)
    }catch(err) {
      console.log(err)
    }
    ctx.body = '上传头像成功'
  }
  /* 动态配图上传 */
  async savePictureInfo(ctx, next) {
    // 获取参数
    const { id } = ctx.user
    const { momentId } = ctx.query
    const files = ctx.req.files
    for(let file of files) {
      const { mimetype, filename, size } = file
      // 依次保存到file表中
      await FileService.createPicture(mimetype, filename, size, id, momentId)
    }
    ctx.body = '上传动态配图成功'
  }
}

module.exports = new FileController()