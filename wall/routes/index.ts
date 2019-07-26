const router = require('koa-router')()
const db  = require('../utils/db/index')

router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 111!'
  })
})


router.get('/string', async (ctx, next) => {
  
})

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
})

module.exports = router
