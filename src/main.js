const bodyParser = require('koa-bodyparser')

const app = require('./app/index')
const config = require('./app/config')
const userRouter = require('./router/user.router')
const authRouter = require('./router/user.auth')
const errorHandle = require('./app/error-handle')


app.use(bodyParser()) // 顺序在router之前
app.use(userRouter.routes())
app.use(userRouter.allowedMethods())
app.use(authRouter.routes())
app.use(authRouter.allowedMethods())

app.on('error', errorHandle)


app.listen(config.APP_PORT, () => {
  console.log(`服务器在${config.APP_PORT}端口启动成功`)
})