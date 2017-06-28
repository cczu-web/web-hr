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
     * 更新招聘者招聘状态
     * 让他们再确认一遍招聘条件
     * 
     * 
     */
    updateAll_seeker_status: async (com_user_phone,com_job_id) => {
       
     
    },

    /**
     * 更新求职者状态
     */
     update_seeker_status: async (com_user_phone,com_job_id,seeker_phone) => {
       
     
    },


}