const Router = require('koa-router')

const { login, success } = require('../controller/auth.controller.js')
const { verifyLogin, verifyAuth } = require('../middleware/auth.middleware')

const authRouter = new Router({
  prefix: '/login'
})

/* 用户登录接口 */
authRouter.post('/', verifyLogin, login)

/* 用户登录验证 */
authRouter.get('/test', verifyAuth, success)
module.exports = authRouter