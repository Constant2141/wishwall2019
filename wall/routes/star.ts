const router = require('koa-router')();
const parseToken = require('../utils/jwt/parseToken')
const starDao = require('../Dao/starDao')

//
router.post("/create", async ctx => {
    let {  openid } = await parseToken(ctx);
    let { title,content,background } = ctx.request.body;
    let code, result;
    let data = {
        title,content,background
    };
    // console.log(data);
    try {
        await starDao.createStar(data);
        result = '发布星球成功'
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
module.exports = router