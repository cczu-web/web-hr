var router = require('koa-router')();
const UTILS = require('../utils');

router
  .get('/', async (ctx, next) => {


    ctx.render('index.html', {
   
     msg:'后台信息123',

    });
  })
  .get('/login',async(ctx,next)=>{
    if(ctx.cookies.get('seeker_cookie')){
        ctx.response.redirect('/seeker')
    }else{
   ctx.render('logintest.html',{
      
   });

    }
  })
  


  module.exports = router;