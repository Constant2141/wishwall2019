const routerApi = require('koa-router')();
const login = require('./login')
const user = require('./user')
const wish = require('./wish')
const treehole = require('./treehole')

routerApi.use('/login', login.routes(), login.allowedMethods())
routerApi.use('/user', user.routes(), user.allowedMethods())
routerApi.use('/wish', wish.routes(), wish.allowedMethods())
routerApi.use('/treehole', treehole.routes(), treehole.allowedMethods())


module.exports = routerApi
