const Router = require('koa-router');
const rp = require('request-promise');
const wxConfig = require('../utils/wx/config');
const getToken = require('../utils/jwt/getToken')
import { getUserInfo } from '../utils/wx/index';
import { addUser } from '../Dao/loginDao';

let router = new Router();
import { User } from '../utils/db/models/User'

router.get('/', async ctx => {
  
  let { code } = ctx.request.query

  let User = await getUserInfo(code).then(async data => {
    if (data == {}) {
      return "拿不到用户数据"
    } else {
      // console.log("用户数据在此 : ", data);
      let User = await addUser(data); 
      return User;
    }
  })
  User.token = getToken(User)

  ctx.body = User
})

router.get('/test', async ctx => {
  let { access_token, openid } = ctx.request.query
  
  let data = await rp(`https://api.weixin.qq.com/sns/userinfo?access_token=${access_token}&openid=${openid}&lang=zh_CN`)
  .then(data => {
    console.log(JSON.parse(data));
    return JSON.parse(data)
  })
  
  data.token = getToken(data)

  ctx.body = await data
})

module.exports = router;
