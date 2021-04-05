const LabelService = require('../service/label.service.js')

class LabelController {
  /* 创建标签 */
  async create(ctx, next) {
    // 获取创建的标签名
    const { name } = ctx.request.body
    ctx.body = '创建标签成功'
    // 创建标签
    const result = await LabelService.create(name)
    ctx.body = result
  }

  /* 获取标签列表 */
  async list(ctx, next) {
    console.log('获取标签列表')
    // 获取页数和大小
    const { size, page } = ctx.request.query
    // 查询列表
    const result = await LabelService.list(size, page)
    ctx.body = {
      data: result,
      message: 'SUCCESS',
      status: '10000'
    }
  }
  /* 获取指定标签下的动态 */
  async momentList(ctx, next) {
    const { labelId } = ctx.params
    const { page, size } = ctx.request.query
    const [result] = await LabelService.getMomentListByLabelId(labelId, size, page)
    ctx.body = {
      data: result,
      message: 'SUCCESS',
      status: '10000',
    }
  }

  /* 给标签添加图片 */
}

module.exports = new LabelController()