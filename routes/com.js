var router = require('koa-router')();
let comservice = require('../service/comService.js');
const UTILS = require('../utils');

router
  .get('/', async (ctx, next) => {


    ctx.render('index.html', {
   
     msg:'后台信息123',

    });
  })

.get('register', async (ctx, next) => {
    ctx.render('com_register.html', {
    });
  })



  //公司登陆
  .post('register',async (ctx, next) => {
   
   let msg='';
   let user_phone=ctx.request.body.user_phone;
   let user_pwd=ctx.request.body.user_pwd;
   
   let result = await comservice.comregisterValid(user_phone, user_pwd);
   if(result=false){
        ctx.render('com_register.html');
        console.log('1');
   }
   else{
        console.log('2');
        ctx.render('index.html',
        msg=' 注册成功'+user_phone);
   }
  })

//公司基初步注册
.post('initial_register',async (ctx, next) => {
  await comservice.com_user_initial_register(ctx);
})



//公司详细信息注册
.post(('final_register',async (ctx, next) => {
  await comservice.com_user_final_register(ctx);
  
})








  module.exports = router;