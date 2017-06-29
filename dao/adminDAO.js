let db = require('../db');

module.exports = {

//查询所有企业信息表
getAllcoms:async ()=>{
     let sql="SELECT * FROM  coms";
        let result = await db.sequelize.query(sql, { type: db.sequelize.QueryTypes.SELECT });

        if (result.length > 0) {
            return result;
        } else {
            return false;
        }
  
},

// 根据企业phone查询该企业的详细信息,与comDAO中方法重叠
getOnecom:async (com_phone)=>{
     let sql="SELECT * "+
            "FROM  coms" 
            +" WHERE  com_user_phone='"+com_phone+"'";
        let result = await db.sequelize.query(sql, { type: db.sequelize.QueryTypes.SELECT });

        if (result.length > 0) {
            return result[0];
        } else {
            return false;
        }
},

//根据企业phone修改更新改企业的详细信息
updateOnecom:async (com)=>{
           let sql = "UPDATE coms "
            +"SET com_name='"+com.com_name+"' ,com_hr = '"+com.com_hr+"',"////负责人
            +"com_img='"+com.com_img+"', com_date='"+ com.com_date+"',"
            +"com_type='"+com.com_type+"',com_email='"+com.com_email+"',"
            +"com_tel='"+com.com_tel+"',com_capital='"+com.com_capital+"',"
            +"com_province='"+com.com_province+"',com_city='"+com.com_city+"',"
            +"com_country='"+com.com_country+"',com_addr='"+com.com_addr+"',"
            +"com_desc='"+com.com_desc+"',com_verify='"+com.com_verify+"',"
            +"com_scale='"+com.com_scale+"',com_website='"+com.com_website+"'"
            +" WHERE com_user_phone ='"+com.com_user_phone+"'";
            
            await db.sequelize.query(sql, { type: db.sequelize.QueryTypes.UPDATE });
},


//查询所有求职者信息
getAllseeker:async ()=>{
        let sql="SELECT * FROM  seekers";
         let result = await db.sequelize.query(sql, { type: db.sequelize.QueryTypes.SELECT });

         if (result.length > 0) {
            return result;
         } else {
            return false;
         }
},

//根据求职者phone查询该求职者基本信息
getOneseeker:async (seeker_phone)=>{
           let sql="SELECT * "+
            "FROM  seekers" 
            +" WHERE  seeker_user_phone='"+seeker_phone+"'";
         let result = await db.sequelize.query(sql, { type: db.sequelize.QueryTypes.SELECT });
         if (result.length > 0) {
            return result[0];
        } else {
            return false;
        }
},

//根据求职者phone修改更新该求职者基本信息
updateOneseeker:async (seeker)=>{
      let sql = "UPDATE seekers "
            + " SET seeker_name = '" + seeker.seeker_name
            + "' , seeker_img='" + seeker.seeker_img + "', seeker_sex='" + seeker.seeker_sex
            + "',seeker_join='" + seeker.seeker_join + "',seeker_hukou='" + seeker.seeker_hukou + "',seeker_living= '" + seeker.seeker_living
            + "',seeker_email='" + seeker.seeker_email + "',seeker_type='" + seeker.seeker_type + "',seeker_workcity='" + seeker.seeker_workcity
            + "',seeker_job='" + seeker.seeker_job + "',seeker_salary = '" + seeker.seeker_job + "'"
            + " WHERE seeker_user_phone =  '" + seeker.seeker_user_phone + "'";

        await db.sequelize.query(sql, { type: db.sequelize.QueryTypes.UPDATE });
},


//根据求职者phone修改更新该求职者教育信息
updateOneseeker_edu:async (seeker_edu)=>{
     let sql = "UPDATE seekers_edu "
            + " SET seeker_edu_start = '" + seeker_edu.seeker_edu_start
            + "' , seeker_edu_end='" + seeker_edu.seeker_edu_end + "', seeker_edu_school='" + seeker_edu.seeker_edu_school
            + "',seeker_edu_profession='" + seeker_edu.seeker_edu_profession + "',seeker_edu_education='" + seeker_edu.seeker_edu_education + "'"
            + " WHERE seeker_edu_id =  '" + seeker_edu.id + "'";

        await db.sequelize.query(sql, { type: db.sequelize.QueryTypes.UPDATE });

},


//根据求职者phone修改更新该求职者工作经历信息
updateOneseeker_exp:async (seeker_exp)=>{
      let sql = "UPDATE seekers_exp "
            + " SET seeker_exp_start = '" + seeker_exp.seeker_exp_start
            + "' , seeker_exp_end='" + seeker_exp.seeker_exp_end + "', seeker_exp_com='" + seeker_exp.seeker_exp_com
            + "',seeker_exp_job='" + seeker_exp.seeker_exp_job + "',seeker_exp_salary='" + seeker_exp.seeker_exp_salary + "',seeker_exp_desc= " + seeker_exp.seeker_exp_comType
            + "',seeker_exp_comsize'" + seeker_exp.seeker_exp_comsize + "'"
            + " WHERE seeker_exp_id =  '" + seeker_exp.seeker_exp_id + "'";

        await db.sequelize.query(sql, { type: db.sequelize.QueryTypes.UPDATE });

},

//根据求职者phone修改更新该求职者证书信息
updateOneseeker_ertificate:async (seeker_certificate)=>{
      let sql = "UPDATE  seekers_certificate"
            + " SET seeker_phone='" + seeker_certificate.seeker_phone + "' ,seeker_cert_type = '" + seeker_certificate.seeker_cert_type
            + "' , seeker_cert_name='" + seeker_certificate.seeker_cert_name + "', seeker_cert_datetime='" + seeker_certificate.seeker_cert_datetime
            + " WHERE seeker_cert_id =  '" + seeker_certificate_id + "'";

        await db.sequelize.query(sql, { type: db.sequelize.QueryTypes.UPDATE });
},


getTerm_edu:async ()=>{
       let sql="SELECT * FROM term_edu ";
        let result = await db.sequelize.query(sql, { type: db.sequelize.QueryTypes.SELECT });

        if (result.length > 0) {
            return result;
        } else {
            return false;
        }
   

},

getTerm_exp:async ()=>{
           let sql="SELECT * FROM term_exp ";
        let result = await db.sequelize.query(sql, { type: db.sequelize.QueryTypes.SELECT });

        if (result.length > 0) {
            return result;
        } else {
            return false;
        }

},

getTerm_job:async ()=>{
        let sql="SELECT * FROM term_job ";
        let result = await db.sequelize.query(sql, { type: db.sequelize.QueryTypes.SELECT });

        if (result.length > 0) {
            return result;
        } else {
            return false;
        }

},

getTerm_salary:async ()=>{
        let sql="SELECT * FROM term_salary ";
        let result = await db.sequelize.query(sql, { type: db.sequelize.QueryTypes.SELECT });

        if (result.length > 0) {
            return result;
        } else {
            return false;
        }

},



//增加职位类别表
insertTerm_job :async (term_job)=>{
  await db.term_job.create({
     term_job:term_job.term_job,
     parent_id:term_job.parent_id,
  })
},
//增加学历类别表
insertTerm_edu :async (term_edu)=>{
  await db.term_edu.create({
     term_edu:term_edu,
  })
},
//增加薪水类别表
insertTerm_salary:async (term_salary)=>{
  await db.term_salary.create({
     term_salary:term_salary.term_salary,
  })
},
//修改职位类别表
updateTerm_job :async (term_job)=>{
       let sql = "UPDATE  term_job"
            + " SET  term_job='" + term_job.term_job + "' ,parent_id = '" + term_id.parent_id+"'"
            + " WHERE term_job_id=  '" + term_job_id + "'";

        await db.sequelize.query(sql, { type: db.sequelize.QueryTypes.UPDATE });
},
//修改学历类别表
updateTerm_edu :async (term_edu)=>{
         let sql = "UPDATE  term_edu"
            + " SET  term_edu='" + term_edu.term_edu + "'"
            + " WHERE term_job_id =  '" + term_job_id + "'";

        await db.sequelize.query(sql, { type: db.sequelize.QueryTypes.UPDATE });
},
//修改薪水类别表
updateTerm_salary:async (term_salary)=>{
          let sql = "UPDATE  term_salary"
            + " SET  term_salary='" + term_salary.term_salary + "'"
            + " WHERE term_salary_id =  '" + term_salary_id + "'";

        await db.sequelize.query(sql, { type: db.sequelize.QueryTypes.UPDATE });
},
//删除职位类别
updateTerm_job :async (term_job)=>{
      
        let sql = "DELETE FROM term_job WHERE term_job_id = '" + term_job_id+"'";

        await db.sequelize.query(sql, { type: db.sequelize.QueryTypes.DELETE });
},
//删除学历类别
updateTerm_edu :async (term_edu)=>{
       let sql = "DELETE FROM term_edu WHERE term_edu_id = '" + term_edu_id+"'";
        await db.sequelize.query(sql, { type: db.sequelize.QueryTypes.DELETE });
},
//删除薪水类别
updateTerm_salary:async (term_salary)=>{
        let sql = "DELETE FROM term_salary WHERE term_salary_id = '" + term_salary_id+"'";

        await db.sequelize.query(sql, { type: db.sequelize.QueryTypes.DELETE});
},
}