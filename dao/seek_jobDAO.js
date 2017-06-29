let db = require('../db');
let UTILS = require('../utils');
module.exports = {

    /**
     * 申请职位
     * @method insertCom_job
     * @param  seek_job
     * 
     */
    insertCom_job: async (seek_job) => {
       
     
    },
    
    /**
     * 一个职位所有申请者(这是一个多表查询)
     * @method getCom_all_job
     * @param  com_user_phone
     * 
     */
    getSomeSeeks: async (com_user_phone,seek_job_verify) => {
        let sql = "SELECT *,date_format(seek_time,'%Y-%m-%d %H:%i') as seek_f_time FROM seekers, com_job,seek_job WHERE com_job.com_job_id = seek_job.com_job_id "
        +" and seek_job.seeker_phone = seeker_user_phone"
        +" and com_user_phone = '"+com_user_phone+"'" 
        +" and seek_job_verify = "+seek_job_verify;

         let result = await db.sequelize.query(sql, { type: db.sequelize.QueryTypes.SELECT });
      if (result.length > 0) {
            return result;
        } else {
            return false;
        }
    },

   
    /**
     * 一个申请者所有的已经申请的职位
     * 更新招聘者招聘状态
     * 让他们再确认一遍招聘条件
     */
    getSome_seek_job: async (seeker_phone) => {
       let sql="select * ,date_format(seek_time,'%Y-%m-%d %H:%i') as seek_f_time from seek_job sj,com_job cj "
       +" where sj.com_job_id=cj.com_job_id and sj.seek_job_verify in (0,1,2,3)"
       +" and sj.seeker_phone='"+seeker_phone+"'";
      let result = await db.sequelize.query(sql, { type: db.sequelize.QueryTypes.SELECT });
      if (result.length > 0) {
            return result;
        } else {
            return false;
        }
    },
    
    /**
     * 插入一条简历申请
     * 
     * @method getCom_all_job
     * @param  com_user_phone
     * 
     */
    insertSeek_job: async (seek_job) => {
       console.log('记忆');
let sql = "INSERT INTO `seek_job` (`seek_job_id`,`com_job_id`,`seeker_phone`,`seek_time`,`seek_job_verify`) VALUES (NULL,"+"'"
+seek_job.com_job_id+"','"+seek_job.seeker_phone+"','"+UTILS.formatDateTime(seek_job.seek_time)+"',"+seek_job.seek_job_verify+")";
await db.sequelize.query(sql, { type: db.sequelize.QueryTypes.INSERT });
},
  //更新所有求职者的状态
    updateAll_seeker_status: async (com_user_phone,com_job_id) => {
       
     
    },

    /**
     * 更新求职者状态
     */
     update_seeker_status: async (com_user_phone,com_job_id,seeker_phone) => {
       
     
    },
    //获取一个申请，主要用于判断该求职者是否已经申请过该职位
       getOneSeek:async(job_id,seeker_user_phone)=>{
       let sql="select * from seek_job  "
       +" where   com_job_id='"+job_id+"'"
       +" and seeker_phone='"+seeker_user_phone+"'";
       let result = await db.sequelize.query(sql, { type: db.sequelize.QueryTypes.SELECT });
       
        if (result.length > 0) {
            return  '已申请';//已申请
        } else {
            return '未申请';//未申请
        }
    },

    //获得一条职位信息,是否需要公司的部分信息
    getOneSeek_job:async(seek_job_id)=>{
      let sql="select * from seek_job sj,com_job cj "
       +" where sj.com_job_id=cj.com_job_id and sj.seek_job_id='"+seek_job_id+"'";
       let result = await db.sequelize.query(sql, { type: db.sequelize.QueryTypes.SELECT });
       
        if (result.length > 0) {
            return result[0];
        } else {
            return false;
        }
    },
     //查看一份简历,对公司
     getOneSeekerInfo:async(seek_job_id)=>{
         "select * from seek_job sj,seekers s"
       +" where sj.seeker_phone=s.seeker_user_phone and sj.seek_job_id='"+seek_job_id+"'";
       let result = await db.sequelize.query(sql, { type: db.sequelize.QueryTypes.SELECT });
       
        if (result.length > 0) {
            return result[0];
        } else {
            return false;
        }
     },
  //修改一条简历或删除一条简历
    updateOneSeek_job:async(seek_job_id,seek_job_verify)=>{
      let sql = "UPDATE seek_job "
            +"SET seek_job_verify='"+seek_job_verify+"'"
            +" WHERE seek_job_id ='"+seek_job_id+"'";
       let result = await db.sequelize.query(sql, { type: db.sequelize.QueryTypes.UPDATE });
       
       
    },
    


}