var router = require('koa-router')();
const UTILS = require('../utils');
let seekerservice = require('../service/seekerService.js');
router

  //获取登录
   .get('login', async (ctx, next) => {

    //console.log('dengl');
    if(ctx.cookies.get('seeker_cookie')){
      ctx.response.redirect('se_index');
     
    }else{
    ctx.render('seeker_login.html', {
   
   });
    }
    
  })
//登录验证
  .post('login_valid', async (ctx, next) => {
      await seekerservice.loginValid(ctx);

  })
  //注册
  .get('seeker_register',async(ctx,next)=>{
    ctx.render('seeker_register.html', {
    
   });   
  })
   //注册验证
   .post('reigister_valid',async(ctx,next)=>{
     //let user ={user_phone,user_pwd};
      let msg='';
       let user_phone = ctx.request.body.user_phone;
       let user_pwd = ctx.request.body.user_pwd;
       if(user_phone==''||user_pwd=='')
       msg='请填写账号信息';
       let flag=await seekerservice.userPhoneValid(user_phone);
       if(flag)
       msg='改手机号已注册过！';
       else{
       await seekerservice.seekerRegister(user_phone,user_pwd);
       ctx.response.redirect('seeker_info');
       }
   })
.get('*', async (ctx, next) => {

 if (ctx.cookies.get('seeker_cookie')) {
     await next();
    } else {
    ctx.response.redirect('login');
    
    }
  })
   .get('/', async (ctx, next) => {


    ctx.render('seeker_index.html', {
   
     msg:'后台信息123',

    });
  })
  //登陆成功到求职者主页面
  .get('se_index',async(ctx,next)=>{
     ctx.render('seeker_index.html', {
   
     msg:'后台信息：求职者',

    });
  })
   //进入基本信息页面
   .get('seeker_info',async(ctx,next)=>{
        ctx.render('seeker_info.html', {      

      });
   })
  //账号退出
   .post('loginout',async(ctx,next)=>{
      ctx.cookies.set('seeker_cookie', '');
    console.log('user logout !');
    ctx.response.redirect('/');
   })

  module.exports = router;