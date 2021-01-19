const Router = require('koa-router')

const { verifyAuth } = require('../middleware/auth.middleware')
const { avatarHandle } = require('../middleware/file.middleware')

const { saveAvatarInfo } = require('../controller/file.controller')

const fileRouter = new Router({
  prefix: '/upload'
})

/* 上传用户头像 */
fileRouter.post('/avatar', verifyAuth, avatarHandle, saveAvatarInfo)


module.exports = fileRouter