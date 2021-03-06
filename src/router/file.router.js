const Router = require('koa-router')

const { verifyAuth } = require('../middleware/auth.middleware')
const { avatarHandle, pictureHandle, pictureRisize, labelHandle } = require('../middleware/file.middleware')

const { saveAvatarInfo, savePictureInfo, saveLabelInfo } = require('../controller/file.controller')

const fileRouter = new Router({
  prefix: '/upload'
})

/* 上传用户头像 */
fileRouter.post('/avatar', verifyAuth, avatarHandle, saveAvatarInfo)
/* 上传标签图片 */
// fileRouter.post('/avatar', labelHandle, saveLabelInfo)
/* 上传动态配图 */
fileRouter.post('/picture', verifyAuth, pictureHandle, pictureRisize, savePictureInfo)


module.exports = fileRouter