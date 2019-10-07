const Jwt = require("jsonwebtoken");
const JwtSecret = "nwernwer";

module.exports = async (ctx) => {
    let token = ctx.header.authorization.split(" ")[1];
    // console.log(token);
    var payload = Jwt.verify(token, JwtSecret);
    return payload;
};
