import { Star } from '../utils/db/models/Star'
import { resolve } from 'bluebird';
const Uuid = require("uuid");
const fs = require('fs')
const path = require('path')

//上传超话的背景图
const uploadfile = async (bgPic, uuid) => {
    console.log(bgPic.path);

    // 创建可读流
    const reader = fs.createReadStream(bgPic.path);
    let filePath = path.join(__dirname, '../public/upload/') + `/${uuid}.png`;
    // 创建可写流
    const upStream = fs.createWriteStream(filePath);
    // 可读流通过管道写入可写流
    reader.pipe(upStream);

    return filePath

}
//发布一个超话
const createStar = async data => {
    let {
        title, content, bgPic, openid
    } = data;
    let uuid = Uuid.v4()


    let path = await uploadfile(bgPic, uuid).then() //上传背景图
    console.log(path);


    let newStar = new Star({
        title, content, uuid, openid, bgPic: path
    });

    return newStar.save()
}
//展示超话列表，flag为1最新排序；0热度排序
const showAllStar = async (curPage, pageSize, flag) => {
    let list = [];
    if (!curPage) curPage = 1;
    if (!pageSize) pageSize = 10;

    console.log(flag);
    console.log(typeof(flag));
    console.log(flag == 1);
    
    if (flag == 1) {
         list = await Star.findAll({
            order: [
                ['createdAt', 'DESC'],
            ],
            offset: (curPage - 1) * pageSize,
            limit: pageSize
        })
    }else{
        list = await Star.findAll({
            order: [
                ['hot', 'DESC'],
                ['createdAt', 'DESC']
            ],
            offset: (curPage - 1) * pageSize,
            limit: pageSize
        })
    }


    return list
}

//超话首页展示
module.exports = {
    createStar,
    showAllStar
}