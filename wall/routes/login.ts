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
  
  let token = getToken(User)

  ctx.body = token

  //刷新access_token
  // rp(`https://api.weixin.qq.com/sns/oauth2/refresh_token?appid=${wxConfig.appid}&grant_type=refresh_token&refresh_token=${refresh_token}`)
  // .then( data => {
  //   let { access_token } = JSON.parse(data);
  //   if( access_token != undefined) {
  //     console.log(access_token);
  //   }
  //   console.log(JSON.parse(data));
  // })

})




module.exports = router;
