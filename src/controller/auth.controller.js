
class AuthController{
  /* 用户登录控制层函数 */
  async login(ctx, next) {
    const { name, password } = ctx.request.body
    ctx.response.body = `欢迎${name}回来`
  }
}

module.exports = new AuthController()