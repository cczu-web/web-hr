let router = require('koa-router')();
let adminservice = require('../service/adminService.js');
let comservice = require('../service/comService.js');
let seekerservice = require('../service/seekerService.js');
let userdao = require('../dao/usersDAO');
let seekerDAO =  require('../dao/seekersDAO');
let comDAO =  require('../dao/comsDAO');
let adminDAO =  require('../dao/adminDAO');

const UTILS = require('../utils');


router
.get('get', async (ctx, next) => {

   
      ctx.render('test.html', {
          data:'this is data', 
      });
   
  })
.post('post', async (ctx, next) => {

 
   ctx.render('test.html', {

   });
  })



module.exports = router;