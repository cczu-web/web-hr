let db = require('../db');

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
    getAll_seek_job: async (com_user_phone,com_job_id) => {
       
     
    },

   
    /**
     * 一个申请者所有的已经申请的职位
     * 更新招聘者招聘状态
     * 让他们再确认一遍招聘条件
     */
    getSome_seek_job: async (com_user_phone,com_job_id) => {
       let sql="select * from seek_job sj,com_job cj "
       +" where sj.com_job_id=cj.com_job_id and sj.seek_job_verify in (0,1,2,3)"
       +"sj.seeker_phone='"+seeker_phone+"'";
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
        await db.seek_job.create({
           com_job_id:seek_job.com_job_id,
           seeker_phone:seek_job.seeker_phone,
           seek_time:seek_job.seek_time,
           seek_job_verify:seek_job.seek_job_verify,
       })
        let sql ="  SELECT last_insert_id() as seek_job_id ";
        let result = await db.sequelize.query(sql, { type: db.sequelize.QueryTypes.SELECT });

        if (result.length > 0) return result[0].seek_job_id;
        else return false;
}
    updateAll_seeker_status: async (com_user_phone,com_job_id) => {
       
     
    },

    /**
     * 更新求职者状态
     */
     update_seeker_status: async (com_user_phone,com_job_id,seeker_phone) => {
       
     
    },
    //获得一条简历
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
  //修改一条简历或删除一条简历
    updateOneSeek_job:async(seek_job_id,seek_job_verify)=>{
      let sql = "UPDATE seek_job "
            +"SET seek_job_verify='"+seek_job_verify+"'"
            +" WHERE seek_job_id ='"+seek_job_id+"'";
       let result = await db.sequelize.query(sql, { type: db.sequelize.QueryTypes.UPDATE });
       
        if (result.length > 0) {
            return result[0];
        } else {
            return false;
        }
    },
    


}