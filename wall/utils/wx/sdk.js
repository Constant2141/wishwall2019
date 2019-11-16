//签名
const sha1 = require("sha1");

const rp = require("request-promise");
//config
const config = require("./config");

function sha1Ticket(ticket, url) {
  let signature;

  let timestamp = 1111111111;

  let jsapi_ticket = ticket;
  console.log(ticket);

  const nonceStr = "nw2019wishwall6.0";
  console.log(url, "123");

  console.log({ timestamp, nonceStr, jsapi_ticket, url });

  let query = `jsapi_ticket=${jsapi_ticket}&noncestr=${nonceStr}&timestamp=${timestamp}&url=${url}`;

  signature = sha1(query);

  let WXconfig = {
    debug: true,
    appId: config.appid,
    timestamp,
    nonceStr,
    signature,
    jsApiList: [
      "updateTimelineShareData",
      "updateAppMessageShareData",
      "onMenuShareAppMessage"
    ]
  };
  return WXconfig;
}

async function getTicket() {
  let ticket = await rp
    .get(
      `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${config.appid}&secret=${config.secret}`
    )
    .then(async res => {
      let access_token = JSON.parse(res).access_token;

      return await rp
        .get(
          `https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=${access_token}&type=jsapi`
        )
        .then(res => {
          return JSON.parse(res).ticket;
        });
    })
    .catch(e => console.log(e));

  return await ticket;
}

module.exports = {
  getTicket,
  sha1Ticket
};
