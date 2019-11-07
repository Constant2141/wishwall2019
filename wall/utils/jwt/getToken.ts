const jwt = require("jsonwebtoken")
const jwtSecret = "nwernwer";


const getToken = ({ nickname, openid,headimgurl,sex }) => {
    
    let payload = {
        nickname,
        openid,
        headimgurl,
        sex
    };
    // console.log('要签名的东西在这');
    // console.log(payload);

    let token = jwt.sign(payload, jwtSecret, { expiresIn: "30d" });
    return token;
};

module.exports = getToken;
