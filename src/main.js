const bodyParser = require('koa-bodyparser')

const app = require('./app/index')
const config = require('./app/config')
const errorHandle = require('./app/error-handle')
const useRoutes = require('./router/index')


app.use(bodyParser()) // 顺序在router之前
useRoutes(app)

app.on('error', errorHandle)


app.listen(config.APP_PORT, () => {
  console.log(`服务器在${config.APP_PORT}端口启动成功`)
})