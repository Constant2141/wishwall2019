const router = require('koa-router')();
const parseToken = require('../utils/jwt/parseToken')
const userDao = require('../Dao/userDao')
import { User } from '../utils/db/models/User' //玄学？加了import就不会报重复声明变量的错误


//修改用户信息，就是修改性别
router.get("/set", async ctx => {
    let { openid } = await parseToken(ctx);
    let { sex } = ctx.request.query;
    let result, code;
    try {
        await userDao.updateSex(openid, sex);
        result = '修改性别成功'
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