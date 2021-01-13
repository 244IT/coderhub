const Router = require('koa-router')

const { create, detail, list, update, remove } = require('../controller/moment.controller.js')
const { verifyAuth, verifyPermission } = require('../middleware/auth.middleware')
const router = new Router({
    prefix: '/moment'
}) 

/* 添加动态 */
router.post('/create', verifyAuth, create)
/* 获取动态详情 */
router.get('/detail/:id', detail)
/* 获取动态列表 */
router.get('/list', list)
/* 修改动态 */
router.post('/update', verifyAuth, verifyPermission, update)
/* 删除动态 */
router.post('/delete', verifyAuth, verifyPermission, remove)


module.exports = router