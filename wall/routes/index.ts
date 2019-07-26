const router = require('koa-router')()
import { User } from '../utils/db/models/User'

router.get('/create', async (ctx, next) => {
  let newUser = await User.create({
    username: "隔壁老王",
    sex: "男吧"
  })
  console.log('创建：' + JSON.stringify(newUser))
  ctx.body = '创建一个老王'
})

router.get('/findAll', async (ctx, next) => {
  const allUser = await User.findAll()

  ctx.body = allUser
})

module.exports = router
