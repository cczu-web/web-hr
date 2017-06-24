
var db = require('../db');
module.exports = {


 userregisterValid: async (user_phone,user_pwd)=>{
     let result= false;
 if (user_phone== '' || user_pwd == ''){
      msg = '请输入账号和密码';
      result= false;
    }
      else if(user_phone== 'com' || user_pwd == '123'){
    result=true;
  } 
  else {
    result= false;
  }
  return  result;
 }

}