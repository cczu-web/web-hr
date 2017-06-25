let db = require('../db');

module.exports = {

     /**
     * 添加公司信息
     * @method insertSeeker
     * @param  com
     * 
     */
    insertCom: async (com) => {
       
        await db.coms.create({
            com_user_phone:com.com_user_phone,
            com_name:com.com_name,
            com_hr:com.com_hr,
            com_img:com.com_img,
            com_date:com.com_date,
            com_type:com.com_type,
            com_email:com.com_email,
            com_tel:com.com_tel,
            com_capital:com.com_capital,
            com_province:com.com_province,
            com_city:com.com_city,
            com_county:com.com_county,
            com_add:com.com_add,
            com_desc: com.com_desc,
            com_verify:0,
   });
     
    },

 /**
     * 更新公司信息
     * @method updateSeeker
     * @param  com
     * 
     */
    updateCom: async (com) => {

        let sql = "UPDATE coms "
            +"  SET com_name='"+com.com_name+"' ,com_hr = '"+com.com_hr
            +"',com_img='"+com.com_img+"', com_date='"+ com.com_date
            +"',com_type='"+com.com_type+"',com_emali='"+com.com_email
            +"',com_tel='"+com.com_tel+"',com_capital='"+com.com_capital
            +"',com_province='"+com.com_province+"',com_city='"+com.com_city
            +"',com_county='"+com.com_county+"',com_add='"+com.com_add
            +"',com_desc='"+com.com_desc+"',com_verify='"+com.com_verify
            +" WHERE com_user_phone =  '"+com.com_user_phone+"'";
            
            await db.sequelize.query(sql, { type: db.sequelize.QueryTypes.UPDATE });
     
    },
     /**
     * 获取一家公司信息
     * @method getSeeker
     * @param  com
     * 
     */
    getCom: async (com_user_phone) => {
        let sql="SELECT * "+
            "FROM  coms" 
            +"WHERE com_user_phone='"+com_user_phone+"'"
        let result = await db.sequelize.query(sql, { type: db.sequelize.QueryTypes.SELECT });

        if (result.length > 0) {
            return result[0];
        } else {
            return false;
        }
     
    },

    /**
     * 发布一条招聘信息
     * @method insertCom_job
     * @param  com_job
     * 
     */
    insertCom_job: async (com_job) => {
        await db.com_job.create({
            com_user_phone:com.com_user_phone,
            com_job:com.com_job,
            com_job_province:com.com_job_province,
            com_job_city:com.com_job_city,
            com_job_salary:com.com_job_salary,
            com_job_num:com.com_job_num,
            com_job_state:com.com_job_state,
            com_job_edu:com.com_job_edu,
            com_job_exp:com.com_job_exp,
            com_job_type:com.com_job_type,
            com_job_desc:com.com_job_desc,
            com_job_publish_time:com.com_job_publish_time,   
        })
    },

    /**
     * 更新一条招聘信息
     * @method updateCom_job
     * @param  com_job
     * 
     */
    updateCom_job: async (com_job) => {
        let sql = "UPDATE com_job "
            +"  SET com_job='"+com_job.com_job+"' ,com_job_province = '"+com_job.com_job_province
            +"',com_job_city='"+com_job.com_job_city+"', com_job_salary='"+ com_job.com_job_salary
            +"',com_job_num='"+com_job.com_job_num+"',com_job_state='"+com_job.com_job_state
            +"',com_job_edu='"+com_job.com_job_edu+"',com_job_exp='"+com_job.com_job_exp
            +"',com_job_type='"+com_job.com_job_type+"',com_job_desc='"+com.com_job.com_job_desc
            +"',com_job_publish_time='"+com_job.com_job_publish_time
            +" WHERE com_job =  '"+com_job.com_job+"'";
            
            await db.sequelize.query(sql, { type: db.sequelize.QueryTypes.UPDATE });   
     
    },

    /**
     * 获取一条招聘信息
     * @method getCom_job
     * @param  com_job_id
     * 
     */
    getCom_job: async (com_job_id) => {

         let sql="SELECT * "+
            "FROM  com_job" 
            +"WHERE com_job_id='"+com_job_id+"'"
        let result = await db.sequelize.query(sql, { type: db.sequelize.QueryTypes.SELECT });

        if (result.length > 0) {
            return result[0];
        } else {
            return false;
        }  
     
    },

    /**
     * 获取公司已发布的所有招聘信息
     * @method getCom_all_job
     * @param  com_user_phone
     * 
     */
    getAllCom_job: async (com_user_phone) => {

        let sql="SELECT * "+
            "FROM  com_job" 
            +"WHERE com_user_phone='"+com_user_phone+"'"
        let result = await db.sequelize.query(sql, { type: db.sequelize.QueryTypes.SELECT });

        if (result.length > 0) {
            return result[0];
        } else {
            return false;
        }   
     
    },


    /**
     * 查询一组招聘信息
     * @method getCom_job
     * @param  sql
     */
    getSomeJobs: async (sql) => {
       
     
    },





}