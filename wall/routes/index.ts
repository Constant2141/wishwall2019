const router = require('koa-router')()
import { User } from '../utils/db/models/User'


router.get('/create', async (ctx, next) => {
  await User.create({
    name: "隔壁老王",
    sex: "男吧"
  })

  ctx.body = '创建一个老王'
})





router.get('/find', async (ctx, next) => {
  const allUser = await User.findOne()

  ctx.body = allUser
})

module.exports = router
