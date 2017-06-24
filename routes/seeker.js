var router = require('koa-router')();
const UTILS = require('../utils');
let seekerservice = require('../service/seekerService.js');
router
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
  //获取登录
   .get('seeker_login', async (ctx, next) => {

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
     
    let msg = '账号密码错误';
     //console.log('藏好登陆');
    let user_phone = ctx.request.body.user_phone;
    let user_pwd = ctx.request.body.user_pwd;

    if (user_phone == '' || user_pwd == '')
      msg = '请输入账号密码';

    let user = await seekerservice.loginValid(user_phone, user_pwd);

    if (user) {
      let cookie_value=Buffer.from(JSON.stringify(user)).toString('base64');
      ctx.cookies.set('seeker_cookie',cookie_value,{signed:true,maxAge:60*60*1000});
        console.log('Set seeker_cookie value:${cookie_value}');

      ctx.render('seeker_index.html', {
     
       msg:'登录成功账号为：'+user_phone

      });
    } else {
      
      ctx.render('seeker_login.html', {
        msg: msg,

      });

    }


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