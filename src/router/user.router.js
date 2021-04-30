const Router = require('koa-router')

const { verifyUser, handlePassword, verifyPassword } = require('../middleware/user.middleware')
const { verifyAuth } = require('../middleware/auth.middleware') 
const { create, avatarInfo, update, updatePassword, labelList } = require('../controller/user.controller')


const userRouter = new Router({
  prefix: '/user'
})

/* 用户注册 */
userRouter.post('/', verifyUser, handlePassword, create)
/* 用户修改密码 */
userRouter.post('/updatePassword', verifyAuth, verifyPassword, updatePassword)
/* 获取用户头像 */
userRouter.get('/:userId/avatar', avatarInfo)
/* 修改用户信息 */
userRouter.post('/update', verifyAuth, update)

module.exports = userRouter