const router = require('koa-router')();
const parseToken = require('../utils/jwt/parseToken')
const wishDao = require('../Dao/wishDao')

//发布一个愿望
router.post("/create", async ctx => {
    let { nickname, openid, headimgurl } = await parseToken(ctx);
    let { wish_type, wish_content,wish_where } = ctx.request.body;
    let code, result;
    let data = {
        nickname,
        openid,
        headimgurl,
        wish_type,
        wish_content,
        wish_where
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
//得到所有未被领取的愿望，首页用
router.get("/list", async ctx => {

    // console.log(ctx.request.query);
    
    let { openid } = await parseToken(ctx);
    let { wish_where } = ctx.request.query;
    let result, code;
    try {
        result = await wishDao.allWish(openid, wish_where);
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

//领取愿望，首页用
router.get("/gain", async ctx => {
    let { openid,nickname } = await parseToken(ctx);
    let { uuid } = ctx.request.query;
    let result, code;
    try {
        result = await wishDao.gainWish(openid, nickname,uuid);
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

module.exports = router