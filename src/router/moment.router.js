const Router = require('koa-router')

const { create, detail, list, update, remove, addLabel, fileInfo, userList } = require('../controller/moment.controller.js')
const { verifyAuth, verifyPermission } = require('../middleware/auth.middleware')
const { verifyLabelExist } = require('../middleware/label.middleware')
const momentRouter = new Router({
    prefix: '/moment'
}) 

/* 添加动态 */
momentRouter.post('/create', verifyAuth, create)
/* 获取动态详情 */
momentRouter.get('/detail/:id', detail)
/* 获取动态列表 */
momentRouter.get('/list', list)
/* 修改动态 */
momentRouter.post('/:momentId', verifyAuth, verifyPermission, update)
/* 删除动态 */
momentRouter.delete('/:momentId', verifyAuth, verifyPermission, remove)
/* 动态添加标签接口 */
momentRouter.post("/:momentId/labels", verifyAuth, verifyPermission, verifyLabelExist, addLabel)

/* 获取某个用户的动态 */
momentRouter.get('/userList', verifyAuth, userList)
/* 动态配图服务 */
momentRouter.get('/images/:filename', fileInfo)


module.exports = momentRouter