const router = require('koa-router')()
const {UserModel} = require('../utils/db/model')

router.get('/create', async (ctx, next) => {
  let newUser = await UserModel.create({
    username: "隔壁老王",
    sex: "男吧"
  })
  console.log('创建：' + JSON.stringify(newUser))
  ctx.body = '创建一个老王'
})

router.get('/findAll', async (ctx, next) => {
  const allUser = await UserModel.findAll()

  ctx.body = allUser
})

module.exports = router
