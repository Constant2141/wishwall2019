import { User } from '../utils/db/models/User'

export async function addUser(newUser) {//将用户添加进数据库，若果已存在直接返回
 
  if (newUser != {}) {
    let { openid, nickname, sex, headimgurl,  city, province, access_token, refresh_token} = newUser;

    let result = await User.findOrCreate({
      where: { openid: openid },
      defaults: { nickname, sex, headimgurl,  city, province, access_token, refresh_token}
    }).then()
    return result[0].dataValues

  } else {
    console.log('newUser is null !');
  }
}