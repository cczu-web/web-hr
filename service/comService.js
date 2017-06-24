
var db = require('../db');
module.exports = {

//登陆
 comregisterValid: async (user_phone,user_pwd)=>{
     let result;
     let msg='';
     console.log('3');
 if (user_phone== '' || user_pwd == ''){
      result= false;
      msg = '请输入账号和密码';
    }
      else if(user_phone== 'com' || user_pwd == '123'){
    result=true;
  } 
  else {
    result= false;
  }
  return  result;
 },



 //公司初步注册(插入手机号和密码)
 com_user_initial_register:async (ctx)=>{

  let user_phone=ctx.request.body.user_phone;
  let user_pwd=ctx.request.body.user_pwd;

   await db.users.create({
     user_phone: user_phone,
     user_pwd: user_pwd,
     user_role:2,
   });
     ctx.render('index.html',  {
    // msg:' 注册成功'+user_phone,
     });
 },


//公司最终注册
com_user_final_register:async (ctx)=>{




},

 //查询公司是否存在
 com_user_phone_Valid:async (user_phone,user_pwd)=>{
   let sql = "select * from users "
   +"where(user_phone='"+user_phone+"')" +"and user_pwd = '"+ user_pwd +"'"

   let result = await db.sequelize.query(sql, { type: db.sequelize.QueryTypes.SELECT });

        if(result.length>0){
            return false;
        }else{
            return true;
        }

    },
 

}