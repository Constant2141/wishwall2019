const Router = require('koa-router');
const rp = require('request-promise');
const wxConfig = require('../utils/wx/config');
import { getUserInfo } from '../utils/wx/index';
import { addUser } from '../controller/login';
let router = new Router();

import { User } from '../utils/db/models/User'

router.get('/getUserInfo', async ctx => {
  
  let { code } = ctx.request.query

  let result = await getUserInfo(code).then(async data => {

    if (data == {}) {
      return "getUserInfo fail, data is null !"
    } else {
      console.log("UserInfo is here : ", data);
      return data;
    }

  })
  let User = await addUser(result);
  ctx.body = User

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

router.post('/addUser', async ctx => {
  let { avator, sex, name } = await ctx.request.body
  //判断是否是第一次登陆
  let anyUser: Array<User> = await User.findAll({
    where: {
      name: name,
    }
  })
  if (!anyUser.length) {
    try {
      let user = await User.create({
        name, sex, avator
      })
      console.log('创建：' + JSON.stringify(user))
      ctx.body = JSON.stringify(user)
    } catch (e) {
      ctx.body = '500 创建新用户失败' + e
    }
  } else {
    ctx.body = anyUser
    console.log('老用户登录');
  }
})


module.exports = router.routes();
