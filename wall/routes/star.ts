const router = require('koa-router')();
const parseToken = require('../utils/jwt/parseToken')
const starDao = require('../Dao/starDao')
const fs = require('fs')
const path = require('path')


//发布超话
router.post("/create", async ctx => {
    let user = await parseToken(ctx);
    let { title,comment } = ctx.request.body;
    let bgPic = ctx.request.files.bgPic; // 获取上传文件
    let code, result;
    let data = {
        title,comment,bgPic,user
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


//添加评论，包含两种功能，根据传参不同决定
router.post("/addComment", async ctx => {
    let user = await parseToken(ctx);
    let { uuid,commentid,comment } = ctx.request.body;
    let result, code;
    try { 
        await starDao.addComment(user, uuid,commentid,comment);
        result = 'addcomment success'
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

//给评论点赞
router.get("/addLike", async ctx => {
    let { commentid } = ctx.request.query;
    let result, code;
    try {
        await starDao.addLikes(commentid);
        result = 'addlike successs'
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



//展示超话列表
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



//展示指定超话(点进某一个超话里面)
router.get("/showStar", async ctx => {
    let {uuid} = ctx.request.query;
    let result, code;
    try { 
        result = await starDao.showOneStar(uuid);
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


//展示指定评论区(点进某一个评论里面)
router.get("/showComment", async ctx => {
    let {commentid} = ctx.request.query;
    let result, code;
    try { 
        result = await starDao.showOneComment(commentid);
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