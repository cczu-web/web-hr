let router = require('koa-router')();
let adminservice = require('../service/adminService.js');
const UTILS = require('../utils');


router
.get('login', async (ctx, next) => {

    if (ctx.cookies.get('user_cookie')) {
      ctx.response.redirect('/manage');
    } else {
      ctx.render('admin_login.html', {});
    }
  })
.post('login-valid', async (ctx, next) => {

    await adminservice.loginValid(ctx);

  })
.get('*', async (ctx, next) => {

 if (ctx.cookies.get('admin_cookie')) {
     await next();
    } else {
      ctx.render('admin_login.html', {});
    }
  })
.get('/index', async (ctx, next) => {
    ctx.render('index.html', {
      msg: '后台信息123',
    });
  })

.get('logout', async (ctx, next) => {

    await  adminservice.logout(ctx);
  })




module.exports = router;