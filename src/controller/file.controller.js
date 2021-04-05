const FileService = require('../service/file.service.js')
const { updateUserAvatar } = require('../service/user.service')

const { APP_HOST, APP_PORT } = require('../app/config')

class FileController {
  /* 头像上传 */
  async saveAvatarInfo(ctx, next) {
    console.log('头像上传')
    console.log(ctx.req.file)
    const { id } = ctx.user
    const { mimetype, filename, size } = ctx.req.file
    // 保存到数据库中
    await FileService.createAvatar(mimetype, filename, size, id)
    // 保存到user表中
    try{
      console.log('准备头像上传')
      const avatarUrl = `${APP_HOST}:${APP_PORT}/user/${id}/avatar`
      await updateUserAvatar(avatarUrl, id)
      console.log('头像上传成功')
      ctx.body = {
        data: {
          avatar_url: avatarUrl
        },
        message: '上传头像成功',
        status: '10000'
      }
    }catch(err) {
      console.log(err)
      ctx.body = {
        message: '上传头像失败',
        status: '400'
      }
    }
    
  }
  /* 标签图片上传 */
  async saveLabelInfo(ctx, next) {

  }
  /* 动态配图上传 */
  async savePictureInfo(ctx, next) {
    console.log('上传动态配图')
    // 获取参数
    const { id } = ctx.user
    const { momentId } = ctx.query
    const files = ctx.req.files
    console.log(id, momentId)
    console.log(files)
    for(let file of files) {
      const { mimetype, filename, size } = file
      // 依次保存到file表中
      await FileService.createPicture(mimetype, filename, size, id, momentId)
    }
    ctx.body = {
      message: '上传动态配图成功',
      status: '10000'
    }
  }
}

module.exports = new FileController()