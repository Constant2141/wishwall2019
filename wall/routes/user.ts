const router = require('koa-router')();
const parseToken = require('../utils/jwt/parseToken')
import { User } from '../utils/db/models/User'

router.get("/get", async ctx => {
    let { openid } = await parseToken(ctx);
    let result, code;
    
    try {
        result = await User.findOne(openid);
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
    
})
module.exports = router