let router = require('koa-router')();
let adminservice = require('../service/adminService.js');



router
.get('login', async (ctx, next) => {

    if (ctx.cookies.get('user_cookie')) {
      ctx.response.redirect('/');
    } else {
      ctx.render('admin_login.html', {});
    }
  })
.post('login_valid', async (ctx, next) => {

    await adminservice.loginValid(ctx);

  })
.get('*', async (ctx, next) => {

 if (ctx.cookies.get('admin_cookie')) {
     await next();
    } else {
    ctx.response.redirect('login');
    
    }
  })
.get('/', async (ctx, next) => {
    ctx.render('index.html', {
      msg: '管理员登录以后的主页',
    });
  })
.get('allinfo/:way',async(ctx,next)=>{
     await adminservice.r_select_allInfo(ctx);
  })
  //增加类别信息
.get('addTermInfo/:way',async(ctx,next)=>{
     await adminservice.r_addTermInfo(ctx);
})
.get('logout', async (ctx, next) => {
    await  adminservice.logout(ctx);
  })




module.exports = router;