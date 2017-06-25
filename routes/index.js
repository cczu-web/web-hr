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

  .get('*', async (ctx, next) => {
    
    // await articleservice.init();

    await next();

  })

  module.exports = router;