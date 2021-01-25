const Multer = require('koa-multer')
const { PICTURE_PATH, AVATAR_PATH } = require('../constants/file-paths')

/* 头像上传处理 */
const avatarUpload = Multer({
  dest: AVATAR_PATH,
})
const avatarHandle = avatarUpload.single('avater')


/* 动态图片上传处理 */
const pictureUpload = Multer({
  dest: PICTURE_PATH,
})
const pictureHandle = pictureUpload.array('picture', 9)

module.exports = {
  avatarHandle,
  pictureHandle
}