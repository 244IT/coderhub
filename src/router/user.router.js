const Router = require('koa-router')

const { verifyUser, handlePassword } = require('../middleware/user.middleware')
const { verifyAuth } = require('../middleware/auth.middleware') 
const { create, avatarInfo, update } = require('../controller/user.controller')


const userRouter = new Router({
  prefix: '/user'
})

/* 用户注册 */
userRouter.post('/', verifyUser, handlePassword, create)
/* 获取用户头像 */
userRouter.get('/:userId/avatar', avatarInfo)
/* 修改用户信息 */
userRouter.post('/update', verifyAuth, update)

module.exports = userRouter