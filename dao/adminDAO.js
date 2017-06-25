let db = require('../db');

module.exports = {

//查询所有企业信息表
getAllcoms:async ()=>{

  
},

// 根据企业phone查询该企业的详细信息
getOnecom:async (com_phone)=>{

},

//根据企业phone修改更新改企业的详细信息
updateOnecom:async (com_phone)=>{

},


//查询所有求职者信息
getAllseeker:async ()=>{

},

//根据求职者phone查询该求职者基本信息
getOneseeker:async (user_phone)=>{

},

//根据求职者phone修改更新该求职者基本信息
updateOneseeker:async (user_phone)=>{

},


//根据求职者phone修改更新该求职者教育信息
updateOneseeker_edu:async (user_phone)=>{

},


//根据求职者phone修改更新该求职者工作经历信息
updateOneseeker_exp:async (user_phone)=>{

},

//根据求职者phone修改更新该求职者证书信息
updateOneseeker_ertificate:async (user_phone)=>{

},




//增加分类
add :async ()=>{

},

}