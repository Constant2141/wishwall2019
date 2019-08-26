import { Wish } from '../utils/db/models/Wish'
import { Like } from '../utils/db/models/Like'
import { Gain } from '../utils/db/models/Gain'
import { resolve, reject } from 'bluebird';
const Uuid = require("uuid");

//获得某个校区的愿望,按发布时间排序
const showAllWish = async (openid, wish_where) => {
    let wishList = await Wish.findAll({
        order: [
            ['createdAt', 'DESC']
        ],
        where: {
            wish_where,
        },
    })

    let gainList = await Gain.findAll({ where: { openid } });
    gainList.forEach(g => {
        wishList.forEach(w => {
            if (g.uuid === w.uuid) {
                w.gainOrNot = true;
            }
        });
    });

    return {
        wishList,
    };
}
//女生发布愿望
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

//男生领取愿望
const gainWish = async (openid, nickname, uuid) => {


    //更新wish中的领取人，领取时间，愿望状态
    await Wish.update({
        picker_openid: openid,
        pick_time: new Date(),
        wish_status: 1,
    }, {
            where: {
                uuid
            }
        });
    //领取人数增加1
    let found = await Wish.findOne({ where: { uuid } })
    await found.increment('wish_many')


    //领取愿望的信息持久化到数据库
    let newGain = new Gain({
        nickname,
        openid,
        uuid
    });
    return await newGain.save();
};

//女生确定愿望已经完成
const finishWish = async (uuid) => {
    Wish.update({
        wish_status: 2,
        finish_time: new Date()
    }, { where: { uuid } })
}

//女生删除愿望
const removeWish = async (uuid) => {
    Wish.destroy({ where: { uuid } })
}

//查看发布的愿望
const showCreated = async (openid) => {
    let wishList = await Wish.findAll({
        order: [
            ['createdAt', 'DESC']
        ],
        where: {
            openid,
        },
    })

    return wishList
}

//查看领取的愿望
const showGained = async (openid) => {
    return new Promise(async (resolve, reject) => {
        var arr = [];
        let list = await Gain.findAll({ where: { openid } })
        list.map(async (ii, index) => {
            let e = await Wish.findOne({ raw: true, where: { uuid: ii.uuid } })
            if (e) {
                await arr.push(e)
            }
            if (index == list.length - 1) {
                console.log(arr);
                resolve(arr)
            }
        })
    })
}


module.exports = {
    createWish,
    showAllWish,
    gainWish,
    finishWish,
    removeWish,
    showCreated,
    showGained
}