
const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const koaError = require('koa-onerror')
const logger = require('koa-logger')
const db = require('./utils/db/')
const koaJwt = require("koa-jwt");
const index = require('./routes/index') 
const tokenSecret = "nwernwer";
const cors = require('koa2-cors');
const koaBody = require('koa-body');


// error handler
koaError(app)

app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))
app.use(cors());

app.use(koaBody({
  multipart: true,
  formidable: {
      maxFileSize: 200*1024*1024    // 设置上传文件大小最大限制，默认2M
  }
}));

app.use(views(__dirname + '/views', {
  extension: 'pug'
}))


// app.context.db=require('./utils/db');



// logger
app.use(async (ctx, next) => {
  const start = new Date().getTime()
  await next()
  const ms = new Date().getTime() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})



// 验证是否有在header中携带token
app.use(
  koaJwt({ secret: tokenSecret }).unless({
      path: [/^\/login/]    
  })
);

// token错误拦截与过期
app.use(async (ctx, next) => {
  if(ctx.header.authorization){
    console.log(ctx.header.authorization);
  }else{
   console.log('没有authorization');
  }
  return next().catch(err => {
      if (err.status === 401) {
          ctx.status = 401;
          ctx.body =
              "错误原因"+err;
      } else {
          throw err;
      }
  });
});


// routes
app.use(index.routes(), index.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
