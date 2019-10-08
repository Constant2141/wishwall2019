const Router = require('koa-router');
const parseToken = require('../utils/jwt/parseToken');

import { addTreeHole } from '../Dao/treeholeDao';
import { getMyTreeHoles } from '../Dao/treeholeDao';
import { getAllTreeHoles } from '../Dao/treeholeDao';
import { addLikes } from '../Dao/treeholeDao';
import { addTreeHoleComment } from '../Dao/treeholeDao';
import { countMyTreeHoles } from '../Dao/treeholeDao';

let router = new Router();

router.post('/addTreeHole', async ctx => {
  let { text } = ctx.request.body;
  let user = await parseToken(ctx);
  console.log(user, text);

  addTreeHole(user.openid, text)

  ctx.body = text
})

router.get('/countMyTreeHoles', async ctx => {
  let user = await parseToken(ctx);

  let count = await countMyTreeHoles(user.openid);

  ctx.body = await count;
})

router.get('/getMyTreeHoles', async ctx => {
  let user = await parseToken(ctx);

  let mytreeholes = await getMyTreeHoles(user.openid);

  ctx.body =await mytreeholes;
})

router.get('/getAllTreeHoles', async ctx => {

  let {countPerPage,currentPage} = ctx.request.query;
  
  let user = await parseToken(ctx);

  let alltreeholes = await getAllTreeHoles(user.openid,parseInt(countPerPage),parseInt(currentPage));

  ctx.body =await alltreeholes;
})

router.post('/addLikes', async ctx => {
  let { treeholeId } = ctx.request.body;

  let res = await addLikes(treeholeId);
  
  if(await res != null && res != undefined){
    ctx.status = 200, ctx.body = 'success'
  }else{
    ctx.status = 500, ctx.body = 'error'
  }

})

router.post('/addTreeHoleComment', async ctx => {
  let { comment,treeholeId,text } = ctx.request.body;

  let user = await parseToken(ctx);

  let res = await addTreeHoleComment(text,user.sex,comment,treeholeId);

  if(await res != null && res != undefined){
    ctx.status = 200, ctx.body = 'success'
  }else{
    ctx.status = 500, ctx.body = 'error'
  }
})
module.exports = router;