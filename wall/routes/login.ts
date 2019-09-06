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
  let {openid, refresh_token } = ctx.request.query
 
  let newAccess = await rp(`https://api.weixin.qq.com/sns/oauth2/refresh_token?appid=${wxConfig.appid}&grant_type=refresh_token&refresh_token=${refresh_token}`)
  .then(data => {
    // console.log(data,'123',data.access_token);
    return JSON.parse(data).access_token
  })

  // console.log(newAccess,'aaaaa');
  
  let User = await rp(`https://api.weixin.qq.com/sns/userinfo?access_token=${newAccess}&openid=${openid}&lang=zh_CN`)
  .then(data => {
    
    return JSON.parse(data)
  })
  await console.log(User,'user user')

  User = await addUser(User)

  User.token =await getToken(User)

  await console.log(User.token,'ssdadasdasd',User);

  ctx.body = await User
})

router.get('/getUserInfo', async ctx => {
  let { userID } = ctx.request.query

  let openid:string = '';
  let refresh_token:string = '';
  let flag = false;


  switch(userID){
    case '01':
      openid = 'oxI5ZwhLofGBCN3l9PnHft2WfzBk';
      refresh_token = '25_H1lClHnhJGAq7OgcRf73wMRWhNZpYjL8UPO_llFmIBQ6pB-0oAvSV0hGvCOnIB1ijPOdJuQl_RRgR6SO0MBylzZGl-Ffjfu8cod0Y6-lbrE'
      break;
    
    case '02':
      openid = 'oxI5Zwkxn98aApWneqQ3PhpcqrS8';
      refresh_token = '25_Jh1XMP9hdLqde1z5Tc0fLbwvzutbDkKi3udUX3bzdznHgO0_W46js8sTjKhuqV-HxACp5_B7loyfM787x95wU7rckEC_JEgJAsTAw13VSgE'
      break;
    
    case '03':
      openid = 'oxI5ZwiKgzs1CC1tUZVBNNC_RSgY';
      refresh_token = '25_VB1OmLTBai95kSdsI9hd5HfQQgiwWzKntCsH9n4oy-g-oiun0NVajKKLBm6jxcn0wM6o6RifYAVANbqkN-AaSZ7W9Jx4Ogg8KVTCGafd6Dk'
      break;
    
    case '11':
        openid = 'oxI5ZwmSsJkP8BcnOoSgOcK2PADY';
        refresh_token = '25_Ir3WpPz6ID93PXBTRoNBf_mCwQsz51dsrEV1ntE2lOngAL7JsRKoteL8X-jCC6Y8XnovRAfk8vPyKnG9FFMx8rnqGNbalnCfNtcpJ1O3xvI'
        break;
    case '12':
        openid = 'oxI5Zwo57627yT48UcOCyOEMkgJg';
        refresh_token = '25_82cMDI_LjlHFkHUQEEWe5SrMHrgMmK502hnUZ3pm1bjKNhCoH5E4dm2XI4ZR9-JubIzD15w7Qi4fqbn0rGFpPDtcQnPFNKEOXPUsnCRiLn0'
        break;

    case '13':
        openid = 'oxI5ZwuJFJ1Ft1ZyXAgvaYPbEUpk';
        refresh_token = '25_FujjLPFnxKcQM9-rFShh2BoHZbRb44H_6FQC0zsQqET3hqP2mohL_yeY5udNEFQQqNl1gOgleyzsw6oJ1ZHfUZLok59sv92B9H71_2PIJDU'
        break;

    default :
        flag = true;
        console.log(0);
    
  }

  if(!flag){
    ctx.redirect(`/login/test?openid=${openid}&refresh_token=${refresh_token}`)
  }else{
    ctx.status = 500
    ctx.body = 'not this userID';
  }

})
module.exports = router;
