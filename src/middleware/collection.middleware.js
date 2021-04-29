const CollectionService = require('../service/collection.service')

/* 验证收藏夹权限 */
const verifyCollectionExist = async (ctx, next) => {
  console.log('验证收藏夹的middleware')
  // 获取收藏夹
  let { collection } = ctx.request.body

  console.log(collection)


    // 查询收藏夹的id
    let result = await CollectionService.getCollectionByName(collection)
    console.log(result)
    // 不存在收藏夹则创建收藏夹
    if(!result.length) {
        const collectionInfo = await CollectionService.create(collection)
        result.push({ id: collectionInfo.insertId})
    }


  // 存在标签则直接将标签信息加入数组
  ctx.collection = {
    name: collection,
    id: result[0].id
  }

  await next()
}

module.exports = {
    verifyCollectionExist
}