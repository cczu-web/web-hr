/**
 * index.js
 * 主要包括：
 * 主页 get  '/'
 */

var router = require('koa-router')();
const UTILS = require('../utils');

router
  .get('/', async (ctx, next) => {


    ctx.render('index.html', {
   
  

    });
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
    await seekerservice.r_seekerRegister(ctx);
  })

  .get('*', async (ctx, next) => {
    
    // await articleservice.init();

    await next();

  })

  //获取查看一条职位信息
.get('job_info/:id',async(ctx,next)=>{
  
  })
//查看公司信息
.get('com_info/:id',async(ctx,next)=>{
  
})

//查看个人简历
.get('seeker_info',async(ctx,next)=>{
  
  //如果是com,可以从数据库查一下，是否在求职者列表中
})


  module.exports = router;