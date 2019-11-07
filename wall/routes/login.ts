const Router = require('koa-router');
const rp = require('request-promise');
const wxConfig = require('../utils/wx/config');
const getToken = require('../utils/jwt/getToken');
import { getUserInfo } from '../utils/wx/index';
import { addUser } from '../Dao/loginDao';

let router = new Router();

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

  let { openid, refresh_token } = ctx.request.query

  console.log(openid, refresh_token);


  let newAccess = await rp(`https://api.weixin.qq.com/sns/oauth2/refresh_token?appid=${wxConfig.appid}&grant_type=refresh_token&refresh_token=${refresh_token}`)
    .then(data => {
      console.log(JSON.parse(data));
      return JSON.parse(data).access_token
    })

  // console.log(newAccess,'aaaaa');

  let User = await rp(`https://api.weixin.qq.com/sns/userinfo?access_token=${newAccess}&openid=${openid}&lang=zh_CN`)
    .then(data => {

      return JSON.parse(data)
    })

  User = await addUser(User)

  User.token = await getToken(User)

  ctx.body = await User
})

router.get('/getUserInfo', async ctx => {
  let { userID } = ctx.request.query

  let openid: string = '';
  let refresh_token: string = '';
  let flag = false;


  switch (userID) {
    case '01':
      openid = 'oO7BY6JRpJ26yi92rE77BEjdnSx0';//艹
      refresh_token = '26_WHNVk-RYC9_6kuMFKW4DWa1uZ-W-PFJbDujE97UGEO5cH-wOmqbE1vhGhjLX5YQRoE_3joYkI5YjSR31ApDqWe_q1s5BfFMMWjb5i-3AJJY'
      break;

    case '02':
      openid = 'oO7BY6J65sGvlImCzcGK6bFD6LTs';//holy
      refresh_token = '26_OBZf3MJELgHDHSMER5o-Z8gi2ZlSW3pbtyirXMvOy2n7JGwfM96u4IV9tzqbRHO8rH1b41wro5S-BEHMkQTkScySoBO7SJNsjmEcYq6g4Wg'
      break;

    case '03':
      openid = 'oO7BY6MEb0D4AXnxHqNuL9_hlQbg'; //朕
      refresh_token = '27_Y8m_zIyw0HIcrwZPg-RhJ2M_o1YMS7gvC0-yF6Ld7mgFb0Spl5Wwv9svkoy-Rp99fGZn2uZIrczipH2jsu7z1_zKDkuNnGyOc0RAJs1a7a8'
      break;

    case '04':
      openid = 'oO7BY6P--E2z-Q81w5lp6GpST-XM';
      refresh_token = '26_VXSzMP3NrCwpPoEGfbwszgkrmQK4D3a6wErDSn3b0VkqRug4h3J2nB9gqRuz6M9lzBFDISA-oirdZPfLYUIAh4Vbf_BozL-a8REN8C0kgq8'
      break;

    case '11':
      openid = 'oO7BY6BmbF9GMgq3UYTPXRoaViNQ'; //奖励金
      refresh_token = '26_YDqGJPgMlft-cCHJYDhNCddCT3rNxCru1kSBxNGhvD71vC8NnDM2nFsLLyV7DlXTEXi2aK-CuYjDZFClOe_qhlLc35eqbQNb6ec84GpeOTQ'
      break;

    case '12':
      openid = 'oO7BY6Hex23uguZok9vA1pPZwVGQ'; //大爷
      refresh_token = '26_O3PDrStzODHR12BUWE-2ZhwgewXnMAo-qCnuPGRnd3LvIvoGzRSRk6hw6KiSfQiv4Org686-Pi-g3gtILQM8V3Dk9bFt1IthQOePVcGZ47E'
      break;

    default:
      flag = true;
      console.log(0);

  }

  if (!flag) {
    ctx.redirect(`/login/test?openid=${openid}&refresh_token=${refresh_token}`)
  } else {
    ctx.status = 500
    ctx.body = 'not this userID';
  }

})


module.exports = router;
