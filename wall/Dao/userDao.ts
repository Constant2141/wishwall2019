import { User } from '../utils/db/models/User'
//选择自己的性别，只调用一次，1为男生，0？2？为女生

// const Sequelize = require('sequelize');
// const Op = Sequelize.Op;

const updateSex = async (openid,sex) => {
    let result = User.update({sex:sex},{where:{openid}})
    return result;
}

//找指定某个人的信息
const findOneUser = async openid =>{
    let result = User.findOne({where:{openid}})
    return result;
}

module.exports = {
    updateSex,
    findOneUser
}