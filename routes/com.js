var router = require('koa-router')();
let comservice = require('../service/comService.js');
const UTILS = require('../utils');

router
  .get('/', async (ctx, next) => {


    ctx.render('index.html', {
   
     msg:'后台信息123',

    });
  })

.get('/register', async (ctx, next) => {


    ctx.render('com_register.html', {
    });
  })


  //公司注册
  //注册账号密码
  .post('/register',async (ctx, next) => {
   console.log('123');
   let user_phone=ctx.request.body.user_phone;
   let user_pwd=ctx.request.body.user_pwd;

   let result = await comservice.userregisterValid(user_login, user_pwd);
   if(result=false){
        ctx.render('com_register.html');
   }
   else{
        ctx.render('index.html',
        msg=' 注册成功'+user_phone);
   }
  })
  module.exports = router;