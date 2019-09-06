import { User } from '../utils/db/models/User'
import { resolve } from 'bluebird';

export async function addUser(newUser) {//将用户添加进数据库，若果已存在直接返回

  if (newUser != {}) {
    let { openid, nickname, sex, headimgurl,  city, province} = newUser;
    let isNewUser:boolean = true;
    let result: any = await User.findOrCreate({
      where: { openid: openid },
      defaults: { nickname, sex, headimgurl,  city, province}
    }).then( data => {
      // data[1] 判断用户是否第一次登陆
      let User : any = data[0];
      
      isNewUser = data[1];

      return User
    }).catch(e => {
      console.log(e);
    })

    result.dataValues.isNewUser = await isNewUser;
    
    return result.dataValues

  } else {
    console.log('newUser is null !');
  }
}