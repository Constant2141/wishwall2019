import {User} from '../utils/db/models/User'

export async function addUser(newUser){
  
  console.log('newUser is here: ',newUser);
  if(newUser != {}){
    let { openid,nickname,sex,headimgurl,access_token } = newUser;

    let anyUser: Array<User> = await User.findAll({
      where: {
        openid: openid
      }
    })

    if(!anyUser.length) {
      try{
        let user = await User.create({
          openid,nickname,sex,access_token,avator:headimgurl
        })
        console.log(JSON.stringify(user),'sss');
        return JSON.stringify(user);

      }catch(e){
        console.log(e);
      }
    }else{
      try{
        let Users =await User.findAll({
          where: {
            openid
          }
        })
        console.log(Users[0],'11111');
        return Users[0]
      }catch(e){
        console.log(e);
      }
    }
  }else{
    console.log('newUser is null !');
  }
}