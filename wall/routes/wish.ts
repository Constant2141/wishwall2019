const router = require('koa-router')();
const parseToken = require('../utils/jwt/parseToken')
const wishDao = require('../Dao/wishDao')
import { Wish } from '../utils/db/models/Wish'


//得到所有未被领取的愿望，首页用
router.get("/list", async ctx => {

    // console.log(ctx.request.query);
    
    let { openid } = await parseToken(ctx);
    let { wish_where ,curPage,pageSize} = ctx.request.query;
    let result, code;
    try { 
        result = await wishDao.showAllWish(openid, wish_where,curPage,pageSize);
        code = 200;
    } catch (err) {
        code = 500;
        result = err.message;
    }
    ctx.body = {
        code,
        result
    };
});

//发布一个愿望，首页用
router.post("/create", async ctx => {
    let { nickname, openid, headimgurl } = await parseToken(ctx);
    let { wish_type, wish_content,wish_where,contact,anonymous } = ctx.request.body;
    let code, result;
    let data = {
        nickname,
        openid,
        headimgurl,
        wish_type,
        wish_content,
        wish_where,
        contact,
        anonymous
    };
    // console.log(data);
    try {
        await wishDao.createWish(data);
        result = '发布愿望成功'
        code = 200;
    } catch (err) {
        result = err.message;
        code = 500;
    }

    ctx.body = {
        code,
        result
    };
});

//领取愿望，首页用
router.get("/gain", async ctx => {
    let { openid,nickname ,headimgurl} = await parseToken(ctx);
    let { uuid } = ctx.request.query;
    let result, code;
    try {
        await wishDao.gainWish(openid, nickname,uuid,headimgurl);
        result = '领取愿望成功'
        code = 200;
    } catch (err) {
        code = 500;
        result = err.message;
    }
    ctx.body = {
        code,
        result
    };
});

//女生确定愿望已经完成，个人主页用
router.get("/finish",async ctx =>{
    let { uuid } = ctx.request.query;
    let result, code;
    try {
        await wishDao.finishWish(uuid);
        result = '确定愿望完成'
        code = 200;
    } catch (err) {
        code = 500;
        result = err.message;
    }
    ctx.body = {
        code,
        result
    };
})

//女生删除愿望，个人主页用
router.get("/remove",async ctx =>{
    let { uuid } = ctx.request.query;
    let result, code;
    try {
        await wishDao.removeWish(uuid);
        result = '删除愿望成功'
        code = 200;
    } catch (err) {
        code = 500;
        result = err.message;
    }
    ctx.body = {
        code,
        result
    };
})

//我发布的，个人主页用
router.get("/iCreated",async ctx =>{
    let { openid } = await parseToken(ctx);
    let result,code;
    try {
        result =await wishDao.showCreated(openid);
        code = 200;
    } catch (err) {
        code = 500;
        result = err.message;
    }
    ctx.body = {
        code,
        result
    };
})

//我领取的,个人主页用
router.get("/iGained",async ctx =>{
    let { openid } = await parseToken(ctx);
    let result, code;
    try {
        result =await wishDao.showGained(openid);
        code = 200;
    } catch (err) {
        code = 500;
        result = err.message;
    }
    ctx.body = {
        code,
        result
    };
})
//查看一个愿望中 具体有谁在什么时间领取了这个愿望
router.get("/showGainDetail",async ctx =>{
    let { uuid } = ctx.request.query;
    let result, code;
    try {
        result =await wishDao.showGainWishDetail(uuid);
        code = 200;
    } catch (err) {
        code = 500;
        result = err.message;
    }
    ctx.body = {
        code,
        result
    };
})


module.exports = router