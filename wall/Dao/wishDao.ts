import { Wish } from '../utils/db/models/Wish'
import { Gain } from '../utils/db/models/Gain'
const Sequelize = require('sequelize');
const Uuid = require("uuid");

//获得某个校区的愿望,按发布时间排序
const showAllWish = async (openid, wish_where, curPage, pageSize) => {
    if (!curPage) curPage = 1;
    if (!pageSize) pageSize = 10;
    let wishList;
    if (wish_where) {
        wishList = await Wish.findAll({
            order: [
                ['createdAt', 'DESC']
            ],
            where: {
                wish_where,
            },
            offset: (curPage - 1) * pageSize,
            limit: pageSize
        })
    } else {
        wishList = await Wish.findAll({
            order: [
                ['createdAt', 'DESC']
            ],
            offset: (curPage - 1) * pageSize,
            limit: pageSize
        })
    }


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
        wish_where,
        contact,
        anonymous
    } = wish;



    let data = new Wish({
        nickname,
        openid,
        headimgurl,
        wish_type,
        wish_content,
        wish_where,
        uuid,
        contact,    //没有默认是null
        anonymous
    });

    return data.save()
}

//男生领取愿望
const gainWish = async (openid, nickname, uuid, headimgurl) => {


    //更新wish中的领取人，领取时间，愿望状态
    await Wish.update({
        picker_openid: openid,
        pick_time: new Date(),
        // wish_status: 1,
    }, {
            where: {
                uuid
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
            attributes: [['createdAt','pick_time'],'headimgurl','nickname']
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