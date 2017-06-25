var router = require('koa-router')();
let comservice = require('../service/comService.js');
const UTILS = require('../utils');

router

//公司基初步注册
.post('initial_register',async (ctx, next) => {
  await comservice.com_user_initial_register(ctx);
})

//公司详细信息注册
.post('final_register',async (ctx, next) => {
  await comservice.com_user_final_register(ctx);
  
})

.get('login', async (ctx, next) => {
    ctx.render('com_register.html', {
    });
  })


//公司登录
.post('login_valid',async (ctx, next) => {
   await comservice.loginValid(ctx);
  })

.get('*', async (ctx, next) => {

 if (ctx.cookies.get('com_cookie')) {
     await next();
    } else {
    ctx.response.redirect('login');
    
    }
  })

  .get('/', async (ctx, next) => {


    ctx.render('index.html', {
   
     msg:'后台信息123',

    });
  })

  //
  .post('com_info_register', async (ctx, next) => {
    


    ctx.render('index.html', {
   
     msg:'后台信息123',

    });
  })



module.exports = router;
