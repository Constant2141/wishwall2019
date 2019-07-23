// 获取 access_token && jsapi_ticket
const rp = require("request-promise");
const qs = require("querystring");
const config = require("./config");
const sdk = require("./sdk");

//获取 access_token
const getAccess_token = () => {
    let STR = qs.stringify({
        grant_type: config.grant,
        appid: config.appId,
        secret: config.secret
    });
    // console.log(STR);
    var url = "https://api.weixin.qq.com/cgi-bin/token?" + STR;//grant_type=client_credential&appid=wxa70c4891aeab4ae1&secret=6c32becf34d1d657957e8e4555cd6ef3
    return rp(url)
        .then(bodyObj => {
            var bodyObj = JSON.parse(bodyObj);
            if (bodyObj.access_token) {
                console.log('成功获取access_token');
                return bodyObj.access_token;
            } else {
                return Promise.reject(STR+"\ngetAccess_token,lose");
            }
        })
        .catch(err => {
            console.log(err);
        });
};

//获取 jsapi_ticket
const getTicket = access_token => {
    let url = `https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=${access_token}&type=jsapi`;
    return rp(url)
        .then(bodyObj => {
            var bodyObj = JSON.parse(bodyObj);

            if (bodyObj.ticket) {
                console.log('成功获取jsapi_ticket');
                return bodyObj.ticket;
                
            } else {
                return Promise.reject("getTicket,lose");
            }
        })
        .catch(err => {
            console.log(err);
        });
};

//获取保存更新 access_token && jsapi_ticket
setInterval(
    (function loopGet() {
        getAccess_token()
            .then(acToken => {
                // console.log("[ access_token Update ]", acToken);
                config.access_token = acToken;
                return getTicket(acToken);
            })
            .then(ticket => {
                // console.log("[ jsapi_ticket Update ]", ticket);
                config.jsapi_ticket = ticket;
            })
            .catch(err => {
                console.log(err);
            });
        return loopGet;
    })(),
    7000 * 1000
);
//7000秒执行一次更新

module.exports = {
    sdk
};