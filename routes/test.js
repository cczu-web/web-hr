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
     let msg='';
    let seeker={};
    seeker.seeker_user_phone=ctx.request.body.seeker_phone;
    seeker.seeker_name=ctx.request.body.seeker_name;
    seeker.seeker_img=ctx.request.body.seeker_img;
    seeker.seeker_sex=ctx.request.body.seeker_sex;
    seeker.seeker_join=ctx.request.body.seeker_join;
    seeker.seeker_hukou=ctx.request.body.seeker_hukou;
    seeker.seeker_living=ctx.request.body.seeker_living;
    seeker.seeker_email=ctx.request.body.seeker_email;
    seeker.seeker_type=ctx.request.body.seeker_type;
    seeker.seeker_workcity=ctx.request.body.seeker_workcity;
    seeker.seeker_job=ctx.request.body.seeker_job;
    seeker.seeker_salary=ctx.request.body.seeker_salary;
    seeker.seeker_now=ctx.request.body.seeker_now;
    console.log(seeker.seeker_img);
   await seekerDAO.insertSeeker(seeker);
   msg='插入成功！';
   ctx.render('test.html', {
      msg:msg,
   });
  })



module.exports = router;