const Router=require('koa-router');
let router=new Router();



router.use('/login',require('./login.ts'))
router.use('/test',require('./test.ts'))


module.exports = router
