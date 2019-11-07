
const router = require('koa-router')();
const parseToken = require('../utils/jwt/parseToken')
const starDao = require('../Dao/starDao')
const fs = require('fs')
const path = require('path')


//发布超话
router.post("/create", async ctx => {
    let user = await parseToken(ctx);
    let { title, comment } = ctx.request.body;
    let bgPic = ctx.request.files.bgPic; // 获取上传文件
    let code, result;
    let data = {
        title, comment, bgPic, user
    };
    // console.log(data);
    try {
        result = await starDao.createStar(data);
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
/**
 * 如果是直接回复在超话下的就发送   uuid和comment
 * 如果是发送在别人的回复下的就发送   commentid(ccid) openid(ccopenid)和comment
 */
router.post("/addComment", async ctx => {
    let user = await parseToken(ctx);
    let { uuid, commentid, comment, openid } = ctx.request.body;



    let result, code;
    try {
        await starDao.addComment(user, uuid, comment, commentid, openid);
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

//给评论点赞,1为点赞，0为取消点赞
router.post("/handleLike", async ctx => {
    let { openid } = await parseToken(ctx);
    let { commentid, upDown } = ctx.request.body;
    let result, code;
    try {
        await starDao.handleLikes(commentid, upDown, openid);
        if (upDown == 1) {
            result = 'addlike successs'
        } else {
            result = 'reducelike successs'
        }
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
    let { curPage, pageSize, flag } = ctx.request.query;
    let result, code;
    try {
        result = await starDao.showAllStar(curPage, pageSize, flag);
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
    let { openid } = await parseToken(ctx);
    let { uuid } = ctx.request.query;
    let result, code;
    try {
        result = await starDao.showOneStar(uuid,openid);
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
    let { commentid } = ctx.request.query;
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

//删除评论
router.get("/removeComment", async ctx => {
    let { commentid } = ctx.request.query;
    let result, code;
    try {
        await starDao.removeComment(commentid);
        result = 'remove comment success'
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
//删除超话
router.get("/removeStar", async ctx => {
    let { uuid } = ctx.request.query;
    let result, code;
    try {
        await starDao.removeStar(uuid);
        result = 'remove star success'
        code = 200;
    } catch (err) {
        code = 500;
        result = err.message;
    }
    ctx.body = {
        code,
        result
    };
})

//与我有关
router.get("/myRelated", async ctx => {
    let { openid } = await parseToken(ctx);
    let result, code;
    try {
        result = await starDao.myRelated(openid);
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



//我的发布
router.get("/myCreated", async ctx => {
    let { openid } = await parseToken(ctx);
    let result, code;
    try {
        result = await starDao.myCreated(openid);
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



//我的评论
router.get("/myComment", async ctx => {
    let { openid } = await parseToken(ctx);
    let result, code;
    try {
        result = await starDao.myComment(openid);
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


//热门排行
router.get("/topChart", async ctx => {
    let result, code;
    try {
        result = await starDao.topChart();
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



//搜索
router.post("/search", async ctx => {
    let { title } = ctx.request.body;
    let result, code;
    try {
        result = await starDao.searchStar(title);
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