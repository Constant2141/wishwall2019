const router = require('koa-router')();
const parseToken = require('../utils/jwt/parseToken')
const userDao = require('../Dao/userDao')
import { User } from '../utils/db/models/User' //玄学？加了import就不会报重复声明变量的错误

//获取用户信息
router.get("/get", async ctx => {
    let { openid } = await parseToken(ctx);
    let result, code;
    
    try {
        result = await userDao.findOneUser(openid);
        code = 200;
    } catch (err) {
        code = 500;
        result = err;
    }

    ctx.body = {
        code,
        result
    };

})

router.get("/set",async ctx => {
    let { openid } = await parseToken(ctx);
    let { sex } = ctx.request.query;
    let result, code;
    try {
        result = await userDao.updateSex(openid,sex);
        code = 200;
    } catch (err) {
        code = 500;
        result = err;
    }

    ctx.body = {
        code,
        result
        
    };
})
module.exports = router