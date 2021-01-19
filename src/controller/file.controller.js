const { createAvatar } = require('../service/file.service.js')

class FileController {
  /* 保存头像信息到数据库 */
  async saveAvatarInfo(ctx, next) {
    const { id } = ctx.user
    const { mimetype, filename, size } = ctx.req.file
    
    const result = await createAvatar(mimetype, filename, size, id)
    ctx.body = result
  }
}

module.exports = new FileController()