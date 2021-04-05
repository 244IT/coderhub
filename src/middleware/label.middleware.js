const LabelService = require('../service/label.service')

/* 验证标签权限 */
const verifyLabelExist = async (ctx, next) => {
  console.log('验证标签的middleware')
  // 获取标签
  let { labels } = ctx.request.body

  console.log(labels)

  // 查询标签的id
  const result = await LabelService.getLabelByName(labels)
  console.log(result)
  // 不存在标签则创建标签
  // if(!result.length) {
  //   const result = await LabelService.create(label)
  //   labelList.push({label, id: result.insertId})
  // }
  // 存在标签则直接将标签信息加入数组
  ctx.labels = {
    name: labels,
    id: result[0].id
  }

  await next()
}

module.exports = {
  verifyLabelExist
}