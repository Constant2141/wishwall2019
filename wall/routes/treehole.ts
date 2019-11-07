const Router = require('koa-router')
    , parseToken = require('../utils/jwt/parseToken')
    , router = new Router();

import { addTreeHole
       , getMyTreeHoles
       , getAllTreeHoles
       , addLikes
       , addTreeHoleComment
       , countMyTreeHoles
       , deleteTreeHole } from '../Dao/treeholeDao';

router.post('/addTreeHole', async ctx => {
  let { text }: { text: string } = ctx.request.body
    , { openid }: { openid: string } = await parseToken(ctx)
    , code: number = 500
    , result: object = {};

  try{
    result =await addTreeHole(openid, text)
    code = 200
  }catch(err) {
    result = err.message
    code = 500
  };
  ctx.body =await {
    code,
    result,
  }
})

router.get('/getMyTreeHoles', async ctx => {
  let { openid } = await parseToken(ctx)
    , code: number = 500
    , result: Array<Object>;

  try{
    result = await getMyTreeHoles(openid);
    code = 200
  }catch(err) {
    result = err.message
    code = 500
  }

  ctx.body =await {
    code,
    result
  };
})

router.get('/getAllTreeHoles', async ctx => {

  let { countPerPage, currentPage } = ctx.request.query
    , { openid } = await parseToken(ctx)
    , code: number = 500
    , result: Array<Object>;
  
  try{
    result = await getAllTreeHoles(openid, parseInt(countPerPage), parseInt(currentPage));
    code = 200
  }catch(err) {
    result = err.message
    code = 500
  }

  ctx.body =await {
    code,
    result
  };
})

router.post('/addLikes', async ctx => {
  let { treeholeId } = ctx.request.body
    , code = 500
    , result: Boolean;

  try{
    result = await addLikes(treeholeId)
    code = 200
  }catch(err) {
    result = err.message
    code = 500
  }
  
  ctx.body = await {
    code,
    result
  }
})

router.post('/deleteTreeHole', async ctx => {
  let { treeholeId } = ctx.request.body
    , code = 500
    , result: Boolean;

  try{
    result = await deleteTreeHole(treeholeId);
    code = 200
  }catch(err) {
    result = err.message;
    code = 500
  }

  ctx.body = await {
    code,
    result
  }
})
router.post('/addTreeHoleComment', async ctx => {
  let { comment, treeholeId } = ctx.request.body
    , { sex } = await parseToken(ctx)
    , code = 500
    , result: Boolean;

  try{
    result = await addTreeHoleComment(sex, comment, treeholeId);
    code = 200
  }catch(err) {
    result = err.message;
    code = 500
  }

  ctx.body = await {
    code,
    result
  }
})

router.get('/countMyTreeHoles', async ctx => {
  let { openid } = await parseToken(ctx)
    , code = 500
    , result: Number;

  try{
    result = await countMyTreeHoles(openid);
    code = 200
  }catch(err) {
    result = err.message
    code = 500
  }

  ctx.body = await {
    code,
    result
  };
})

module.exports = router;