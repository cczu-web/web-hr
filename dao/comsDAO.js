let db = require('../db');

module.exports = {


//公司向数据库插入信息

//公司最终注册
com_user_final_register:async (ctx,com_phone)=>{

 let  com_name=ctx.request.body.user_name;
 let  com_hr=ctx.request.body.com_hr;
 let  com_img=ctx.request.body.com_img;
 let  com_date=ctx.request.body.com_date;
 let  com_type=ctx.request.body.com_type;
 let  com_email=ctx.request.body.com_email;
 let  com_tel=ct.request.body.com_tel;
 let  com_capital=ctx.request.body.com_capital;
 let  com_province=ctx.request.body.com_province;
 let  com_city=ctx.request.body.com_city;
 let  com_county=ctx.request.body.com_county;
 let  com_add=ctx.request.body.com_add;
 let  com_desc=ctx.request.body.com_desc;

  await db.coms.create({
     com_phone:com_phone,
     com_name: com_name,
     com_hr: com_hr,
     com_img:com_img,

     user_role:2,
   });
},


}