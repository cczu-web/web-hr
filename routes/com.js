var router = require('koa-router')();
const UTILS = require('../utils');

router
  .get('/', async (ctx, next) => {


    ctx.render('index.html', {
   
     msg:'后台信息123',

    });
  })

  //公司注册
  router
  .get('',async (ctx, next) => {
    let  com_user_phone=ctx.params.com_user_phone;  //手机号
    let  com_name=ctx.params.com_name;              //公司名称
    let  com_hr=ctx.params.com_hr;                  //公司法人



  })



  module.exports = router;