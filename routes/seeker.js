var router = require('koa-router')();
const UTILS = require('../utils');
let seekerservice = require('../service/seekerService.js');
router

  //获取登录
   .get('login', async (ctx, next) => {

    //console.log('dengl');
    if(ctx.cookies.get('seeker_cookie')){
      ctx.response.redirect('/seeker/index');
    }else{
    ctx.render('s_login.html', {
   
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
       msg='该手机号已注册过！';
       else{
       await seekerservice.seekerRegister(user_phone,user_pwd);
       ctx.render('seeker_info.html',{
         user_phone:user_phone,
       });
       }
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


    ctx.render('seeker_index.html', {
   
     msg:'后台信息123',

    });
  })


  //登陆成功到求职者主页面
  .get('index',async(ctx,next)=>{
     await seekerservice.r_seekerIndex(ctx);
  })

  .post('update_expect',async(ctx,next)=>{
     
      await seekerservice.r_seeker_update_expect(ctx);
   })









   //进入基本信息页面
   .get('seeker_info',async(ctx,next)=>{
        ctx.render('seeker_info.html', {      
         
      });
   })
   //注册求职者基本信息
   .post('register_info',async(ctx,next)=>{
     await seekerservice.insertSeeker(ctx);
   })
  //账号退出
   .post('loginout',async(ctx,next)=>{
      ctx.cookies.set('seeker_cookie', '');
    console.log('user logout !');
    ctx.response.redirect('/');
   })

  module.exports = router;