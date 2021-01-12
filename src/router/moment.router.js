const Router = require('koa-router')

const { create, detail, list } = require('../controller/moment.controller.js')
const { verifyAuth } = require('../middleware/auth.middleware')
const router = new Router({
    prefix: '/moment'
}) 

/* 添加动态 */
router.post('/create', verifyAuth, create)
/* 获取动态详情 */
router.get('/detail/:id', detail)
/* 获取动态列表 */
router.get('/list', list)


module.exports = router