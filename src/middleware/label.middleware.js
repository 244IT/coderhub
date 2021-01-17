const { getLabelByName, create } = require('../service/label.service')

/* 验证标签权限 */
const verifyLabelExist = async (ctx, next) => {
  console.log('验证标签的middleware')
  // 获取标签
  const { labels } = ctx.request.body
  // 判断标签是否存在
  const labelList = []
  for(let name of labels) {
    const result = await getLabelByName(name)
    // 不存在标签则创建标签
    if(!result.length) {
      const result = await create(name)
      labelList.push({name, id: result.insertId})
      continue
    }
    // 存在标签则直接将标签信息加入数组
    labelList.push({name, id: result[0].id}) 
  }
  ctx.labels = labelList
  await next()
}

module.exports = {
  verifyLabelExist
}