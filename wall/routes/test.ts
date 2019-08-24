const Router = require('koa-router');
let router = new Router();


import { Wish } from '../utils/db/models/Wish'
import { Json } from 'sequelize/types/lib/utils';

router.get('/createMany', async (ctx, next) => {

  return new Promise((resolve, reject) => {
    Wish.bulkCreate([
      { author: 'aaa', event: '我要咸鱼', thumbsUp: 1 },
      { author: 'bbb', event: '我要芋圆', thumbsUp: 2 },
      { author: 'ccc', event: '我要鱼丸', thumbsUp: 3 }
    ])
      .then(() => {
        return Wish.findAll()
      })
      .then(result => {
        resolve(ctx.body = result)
      })
  })

})

router.get('/create', async (ctx, next) => {
  // return new Promise((resolve, reject) => {
  let result = await Wish.create({
    author: '饭醉',
    event: '我不要不知火了'
  })


  ctx.body = JSON.stringify(result);

  // })

})





router.get('/find', async (ctx, next) => {
  let one = await Wish.findOne({
    where: { id: 1 }
  })
  let result = one.increment('thumbsUp', { by: 1 })

  let Newone = await Wish.findOne({
    where: { id: 1 }
  })


  ctx.body = Newone
})


module.exports = router.routes();