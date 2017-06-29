/**
 * index.js
 * 主要包括：
 * 主页 get  '/'
 */

var router = require('koa-router')();
const UTILS = require('../utils');
let indexservice = require('../service/indexService.js');
router
  .get('*', async (ctx, next) => {
    
      ctx.state.seeker = UTILS.parse(ctx.cookies.get('seeker_cookie'));
      ctx.state.com = UTILS.parse(ctx.cookies.get('com_cookie'));
    
    await next();

  })
  .get('/', async (ctx, next) => {

await indexservice.r_index(ctx);

  })

  //注册
  .get('register', async (ctx, next) => {
    ctx.render('register.html', {
    });
  })

  /**
   * // 注册分为验证valid _暂时没有用ajax验证
   * 账号注册step1，
   * 基本信息注册seeker_step，com_step
   */
  .post('register/:step', async (ctx, next) => {

    await indexservice.r_seekerRegister(ctx);

  })



  //获取查看一条职位信息
.get('job_info/:id',async(ctx,next)=>{
    await indexservice.r_JobInfo(ctx);
   
  })
//查看公司信息
.get('com_info/:id',async(ctx,next)=>{
  await indexservice.r_com_info(ctx);
})

//查看个人简历，此处id代表的是什么
.get('seeker_info/:id',async(ctx,next)=>{
  await indexservice.r_one_seekInfo(ctx);
})

//查看个人简历，此处id代表的是什么
.get('search/job',async(ctx,next)=>{
  await indexservice.r_search_job(ctx);
})
.get('search/job/add/:type/:value',async(ctx,next)=>{
  await indexservice.r_search_job_add(ctx);
})

//搜索职位信息
.post('search/job',async(ctx,next)=>{
    await indexservice.r_search_job(ctx);
})

  module.exports = router;