const path = require('path')

const Jimp = require('jimp')
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


/* 图片大小剪裁 */
const pictureRisize = async (ctx, next) => {
  const { files } = ctx.req
  for(let file of files) {
    const { destination, filename } = file
    const destPath = path.join(destination, filename)
    // 剪裁三种类型图片
    Jimp.read(file.path).then(image => {
      image.resize(1280, Jimp.AUTO).write(`${destPath}-large`)
      image.resize(640, Jimp.AUTO).write(`${destPath}-middle`)
      image.resize(320, Jimp.AUTO).write(`${destPath}-small`)
    })
  }
  await next()
}

module.exports = {
  avatarHandle,
  pictureHandle,
  pictureRisize
}