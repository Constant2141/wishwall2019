import { Wish } from '../utils/db/models/Wish'
import { Like } from '../utils/db/models/Like'
import { Gain } from '../utils/db/models/Gain'
const Uuid = require("uuid");

//发布愿望
const createWish = async wish => {
    let uuid = Uuid.v4()
    let {
        openid,
        nickname,
        headimgurl,
        wish_content,
        wish_type,
        wish_where
    } = wish;


    let data = new Wish({
        nickname,
        openid,
        headimgurl,
        wish_type,
        wish_content,
        wish_where,
        uuid
    });

    return data.save()
}
//获得某个校区未被领取的愿望,并统计数量
const allWish = async (openid, wish_where) => {
    var lists = await Wish.findAndCountAll({
        where: {
            wish_where,
            wish_status: 0
        }
    })

    return {
        lists,
    };
}

//男生领取愿望
const gainWish = async (openid,nickname,uuid) => {

    // 检查当前用户已领愿望是否超过上限
    var howMany = await Wish.findAll({
        where: {
            wish_status: 1,
            picker_openid: openid
        }
    });
    if (howMany.length > 3) {
        throw new Error("别太贪心了");
    }

    // 该愿望是否已被领取
    let ifDraw = await Wish.findAll({
        where:{
            wish_status: 0,
            uuid
        }
    });
    if (!ifDraw.length) {
        throw new Error("该愿望已被领取");
    }

    await Wish.update({
        picker_openid:openid,
        pick_time: new Date(),
        wish_status: 1,
    },{
        where:{
            uuid
        }
    });

    let newGain = new Gain({
        nickname,
        openid,
        uuid
    });
    return await newGain.save();
};

module.exports = {
    createWish,
    allWish,
    gainWish
}