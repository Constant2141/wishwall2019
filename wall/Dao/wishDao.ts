import { Wish } from '../utils/db/models/Wish'
import { Gain } from '../utils/db/models/Gain'
import { Temp } from '../utils/db/models/Temp';
const Sequelize = require('sequelize');
const Uuid = require("uuid");

//获得某个校区的愿望,按发布时间排序  wish_status   0 表示还没被确认完成，1表示确认完成了
const showAllWish = async (openid, wish_where, curPage, pageSize) => {
    if (!curPage) curPage = 1;
    if (!pageSize) pageSize = 10;
    let wishList;
    if (wish_where) {
        wishList = await Temp.findAndCountAll({
            order: [
                ['createdAt', 'DESC']
            ],
            where: {
                wish_where,
                wish_status: 0
            },
            offset: (curPage - 1) * pageSize,
            limit: Number(pageSize)
        })
    } else {
        wishList = await Temp.findAndCountAll({
            order: [
                ['createdAt', 'DESC']
            ],
            offset: (curPage - 1) * pageSize,
            limit: Number(pageSize)
        })
    }


    let gainList = await Gain.findAll({ where: { openid } });
    gainList.forEach(g => {
        wishList.rows.forEach(w => {
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
        wish_where,
        contact,
        anonymous
    } = wish;

    let obj = {
        nickname,
        openid,
        headimgurl,
        wish_type,
        wish_content,
        wish_where,
        uuid,
        contact,
        anonymous
    }



   await Wish.create(obj);
   await Temp.create(obj);

}

//男生领取愿望
const gainWish = async (openid, nickname, uuid, headimgurl) => {


    //这里逻辑修改，只有是第一个人领取此条愿望的时候才会执行，保存firstPicker_time第一个领取的人的时间
    await Wish.update({
        firstPicker_time: new Date(),
    }, {
            where: {
                uuid,
                wish_many: 0
            }
        });

    //领取人数增加1
    let found = await Wish.findOne({ where: { uuid } })
    await found.increment('wish_many')


    //创建Gain
    let newGain = new Gain({
        nickname,
        openid,
        uuid,
        headimgurl,
    });
    return await newGain.save();
};

//女生确定愿望已经完成
const finishWish = async (uuid) => {
    // console.log('有执行吗');

    Wish.update({
        wish_status: 1,
        finish_time: new Date()
    }, { where: { uuid } })
}

//女生删除愿望
const removeWish = async (uuid) => {
    Wish.destroy({ where: { uuid } })
}

//个人主页————查看我发布的愿望
const showCreated = async (openid) => {

    let wishList = await Wish.findAll({
        order: [
            ['createdAt', 'DESC']
        ],
        where: {
            openid,
        },
        attributes: ['createdAt', 'uuid', 'contact', 'wish_content', 'wish_type', 'wish_where', 'wish_status', 'wish_many', 'anonymous'],
        include: [{
            model: Gain,
            // as: 'g',
            attributes: [['createdAt', 'pick_time'], 'headimgurl', 'nickname']
        }],

    })

    return wishList
}

//个人主页————查看我领取的愿望
const showGained = async (openid) => {
    let gainList = await Gain.findAll({
        order: [
            ['createdAt', 'DESC']
        ],
        where: {
            openid,
        },
        attributes: [
            Sequelize.col('w.createdAt'),
            Sequelize.col('w.uuid'),
            Sequelize.col('w.contact'),
            Sequelize.col('w.wish_content'),
            Sequelize.col('w.wish_type'),
            Sequelize.col('w.wish_where'),
            Sequelize.col('w.wish_status'),
            Sequelize.col('w.wish_many'),
            Sequelize.col('w.anonymous'),
            Sequelize.col('w.headimgurl'),
            Sequelize.col('w.nickname'),
        ],
        include: [{
            model: Wish,
            as: 'w',
            attributes: []
        }],
        raw: true
    })

    return gainList





}



module.exports = {
    createWish,
    showAllWish,
    gainWish,
    finishWish,
    removeWish,
    showCreated,
    showGained,
}