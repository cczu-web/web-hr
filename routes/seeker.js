var router = require('koa-router')();
const UTILS = require('../utils');
let seekerservice = require('../service/seekerService.js');
router

  //获取登录
  .get('login', async (ctx, next) => {

    //console.log('dengl');
    if (ctx.cookies.get('seeker_cookie')) {
      ctx.response.redirect('/seeker/index');
    } else {
      ctx.render('s_login.html', {

      });
    }

  })
  //登录验证
  .post('login_valid', async (ctx, next) => {
    await seekerservice.loginValid(ctx);
  })
  
  .get('*', async (ctx, next) => {

    if (ctx.cookies.get('seeker_cookie')) {

      ctx.state.seeker = UTILS.parse(ctx.cookies.get('seeker_cookie'));
      console.log(ctx.state.seeker);
      await next();
    } else {
      ctx.response.redirect('/seeker/login');

    }
  })

  .post('*', async (ctx, next) => {

    if (ctx.cookies.get('seeker_cookie')) {

      ctx.state.seeker = UTILS.parse(ctx.cookies.get('seeker_cookie'));
      console.log(ctx.state.seeker);
      await next();
    } else {
      ctx.response.redirect('/seeker/login');

    }
  })

  .get('/', async (ctx, next) => {
     ctx.response.redirect('/seeker/index');
  })


  //登陆成功到求职者主页面
  .get('index', async (ctx, next) => {
    await seekerservice.r_seekerIndex(ctx);
  })

  //期望工作更新，工作经历更新，教育经历更新
  .post('update/:way', async (ctx, next) => {
    console.log("更新部分为：" + ctx.params.id);

    await seekerservice.r_seeker_update(ctx);
  })

  //删除一条教育信息或工作经历
  .get('delete/:way/:id', async (ctx, next) => {
    await seekerservice.r_seeker_delete(ctx);
  })

  //获取所有申请的职位
  .get('myjob', async (ctx, next) => {
    await seekerservice.r_seeker_all_job(ctx);
  })

  //申请一个职位
  //确认一个职位
  //取消一个职位
  .get('job/:act/:id', async (ctx, next) => {
  
       await seekerservice.r_seeker_one_job(ctx);

  })



  //账号退出
  .get('loginout', async (ctx, next) => {
    ctx.cookies.set('seeker_cookie', '');
    console.log('user logout !');
    ctx.response.redirect('/');
  })

module.exports = router;