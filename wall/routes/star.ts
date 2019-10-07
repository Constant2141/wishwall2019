
const router = require('koa-router')();
const parseToken = require('../utils/jwt/parseToken')
const starDao = require('../Dao/starDao')
const fs = require('fs')
const path = require('path')


//发布超话
router.post("/create", async ctx => {
    let {  openid } = await parseToken(ctx);
    let { title,content } = ctx.request.body;
    let bgPic = ctx.request.files.bgPic; // 获取上传文件
    let code, result;
    let data = {
        title,content,bgPic,openid
    };
    // console.log(data);
    try {
        await starDao.createStar(data);
        result = '发布星球成功'
        code = 200;
    } catch (err) {
        result = err.message;
        code = 500;
    }

    ctx.body = {
        code,
        result
    };
});

//展示首页
router.get("/list", async ctx => {
    let {curPage,pageSize,flag} = ctx.request.query;
    let result, code;
    try { 
        result = await starDao.showAllStar(curPage,pageSize,flag);
        code = 200;
    } catch (err) {
        code = 500;
        result = err.message;
    }
    ctx.body = {
        code,
        result
    };
});


module.exports = router