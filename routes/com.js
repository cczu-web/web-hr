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
  //公司信息页面info
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
      nowUser:'com',
      com: ctx.state.com,
         comUser: ctx.state.com

    });
  })


  //发布的招聘信息
  .post('publish/job', async (ctx, next) => {
    await comservice.r_com_publish_job(ctx);
  })


    //更新发布的招聘信息
  .get('update/job/:id', async (ctx, next) => {
    await comservice.r_getCom_job(ctx);
  })

  //更新公司信息；更新发布的招聘信息
  .post('update/:way', async (ctx, next) => {
    await comservice.r_com_update(ctx);
  })

  /**
   * 获得公司发布的招聘信息
   * //1有效
   * //0结束
   */
  .get('my/job/:state', async (ctx, next) => {
    await comservice.r_com_some_jobs(ctx);
  })

  /**
   *我收到的简历，
   *未录取为-1
   *待确认为0
   *已录取简历为1
   *待查看简历2
   *已查看3
   */
  .get('job/cv/:state', async (ctx, next) => {
    await comservice.getSomeSeeks(ctx);
  })

//公司选定求职者
/**
 * select 选定一个求职者
 */
  .get('cv/:way/:id', async (ctx, next) => {
    await comservice.selectSeeker(ctx);
  })


  //账号退出
  .get('loginout', async (ctx, next) => {
    ctx.cookies.set('com_cookie', '');
    console.log('user logout !');
    ctx.response.redirect('/');
  })

module.exports = router;
