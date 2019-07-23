const sha1 = require("sha1");
const config = require("./config");

//生成签名的随机串
const getNoncestr = () =>
    Math.random()
        .toString(36)
        .substr(2, 15);
//签名算法
const getSign = (url, ns, ts) => {
    let jsapi_ticket = config.jsapi_ticket;
    let args = {
        jsapi_ticket,
        noncestr: ns,
        timestamp: ts,
        url: url
    };

    //对 args 进行排序
    let keys = Object.keys(args).sort();
    let newArgs = {};
    keys.forEach(key => {
        newArgs[key] = args[key];
    });

    var string = "";
    for (var k in newArgs) {
        string += "&" + k + "=" + newArgs[k];
    }
    string = string.substr(1);
    return sha1(string); 
};
const wxConfig = url => {
    console.log('传过来的url是'+url);
    // console.log(`wxConfig:${url}`);
    let appId = config.appId,
        timestamp = Math.round(new Date() / 1000),
        noncestr = getNoncestr(),
        signature = getSign(url, noncestr, timestamp);

    // 返回微信配置
    return {
        appId,
        timestamp,
        nonceStr: noncestr,
        signature
    };
};


module.exports = {
    wxConfig,
};
