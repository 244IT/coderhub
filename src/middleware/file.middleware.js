const Multer = require('koa-multer')

const avatarUpload = Multer({
  dest: './upload/avatar'
})

const avatarHandle = avatarUpload.single('avater')
module.exports = {
  avatarHandle
}