var router = require('koa-router')();
let comservice = require('../service/comService.js');
const UTILS = require('../utils');

router

  .get('login', async (ctx, next) => {
    if (ctx.cookies.get('com_cookie')) {
      ctx.response.redirect('/com/index');
    } else {
      ctx.render('c_login.html', {

      });
    }
  })


  //公司登录
  .post('login_valid', async (ctx, next) => {
    await comservice.loginValid(ctx);
  })

  .get('*', async (ctx, next) => {

    if (ctx.cookies.get('com_cookie')) {
      ctx.state.com = UTILS.parse(ctx.cookies.get('com_cookie'));
      await next();
    } else {
      ctx.response.redirect('/com/login');

    }
  })
  .post('*', async (ctx, next) => {

    if (ctx.cookies.get('com_cookie')) {

      ctx.state.com = UTILS.parse(ctx.cookies.get('com_cookie'));
      await next();
    } else {
      ctx.response.redirect('/com/login');

    }
  })

  .get('/', async (ctx, next) => {
    ctx.response.redirect('/com/index');
  })

  //登陆成功到求职者主页面
  .get('index', async (ctx, next) => {
    await comservice.r_comIndex(ctx)
  })
  //公司信息更新页面info
  //公司查看所有招聘信息job
  .get('my/:way', async (ctx, next) => {

    await comservice.r_com_my(ctx);
  })
// 公司查看一条招聘信息里的所有求职者seeker
  .get('all_seekers/:id', async (ctx, next) => {

   await comservice.getAllSeeks_job(ctx);
  })

  /**
   * 发布招聘页面
   * 
   */
  .get('publish/job', async (ctx, next) => {

    ctx.render('c_job.html', {
      com: ctx.state.com
    });
  })


  //更新公司信息；更新发布的招聘信息
  .post('publish/:way', async (ctx, next) => {
    await comservice.r_com_publish_job(ctx);
  })


   


  //更新公司信息；更新发布的招聘信息
  .post('update/:way', async (ctx, next) => {
    await comservice.r_com_update(ctx);
  })


  .get('publish/job', async (ctx, next) => {

    ctx.render('c_job.html', {
      com: ctx.state.com
    });
  })

//公司选定求职者

  .post('select', async (ctx, next) => {
    await comservice.selectSeeker(ctx);
  })




module.exports = router;
