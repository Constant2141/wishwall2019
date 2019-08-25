import { resolve, reject } from "bluebird";

const wxConfig = require("./config")
const rp = require('request-promise');

export async function  getUserInfo(code) {
  let url: string= `https://api.weixin.qq.com/sns/oauth2/access_token?appid=${wxConfig.appid}&secret=${wxConfig.secret}&code=${code}&grant_type=${wxConfig.grant_type}`
  let result: any = {};
  result.access_token = '';

  return new Promise((resolve,reject)=>{

  console.log('code is here: ',code);
    if (code != undefined) {
      rp(url)
        .then(data => {
          let { access_token, refresh_token, openid } = JSON.parse(data);
          if (access_token != undefined) {
            console.log('access_token is here: ', access_token);
            rp(`https://api.weixin.qq.com/sns/userinfo?access_token=${access_token}&openid=${openid}&lang=zh_CN`)
            .then(data => {
              // console.log('data is here: ', JSON.parse(data));
              result = JSON.parse(data);
              result.access_token = access_token;
              resolve(result);
            })
            .catch(e => {
              console.log(e);
            })
          } else {
            console.log('access_token is undefined');
            resolve(result);
          }
        })
    }
  })
  
}