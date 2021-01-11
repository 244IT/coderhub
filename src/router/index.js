const fs = require('fs')

/* 路由动态加载 */
const useRoutes = (app) => {
    fs.readdirSync(__dirname).forEach(file => {
        if(file === 'index.js') return
        const router = require(`./${file}`)
        app.use(router.routes())
        app.use(router.allowedMethods())
    })
}

module.exports = useRoutes