let db = require('../db');
let UTILS = require('../utils');
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
            com_country:com.com_country,
            com_add:com.com_add,
            com_desc: com.com_desc,
            com_verify:0,
            com_scale:com.com_scale,
            com_website:com.com_website,
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
            +" SET com_name='"+com.com_name+"' ,com_hr = '"+com.com_hr+"',"////负责人
            +" com_img='"+com.com_img+"', com_date='"+ com.com_date+"',"
            +" com_type='"+com.com_type+"',com_email='"+com.com_email+"',"
            +" com_tel='"+com.com_tel+"',com_capital='"+com.com_capital+"',"
            +" com_province='"+com.com_province+"',com_city='"+com.com_city+"',"
            +" com_country='"+com.com_country+"',com_addr='"+com.com_addr+"',"
            +" com_desc='"+com.com_desc+"',com_verify='"+com.com_verify+"',"
            +" com_scale='"+com.com_scale+"',com_website='"+com.com_website+"'"
            +" WHERE com_user_phone ='"+com.com_user_phone+"'";
            
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
            +" WHERE  com_user_phone='"+com_user_phone+"'";
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
            com_user_phone:com_job.com_user_phone,
            com_job:com_job.com_job,
            com_job_province:com_job.com_job_province,
            com_job_city:com_job.com_job_city,
            com_job_salary:com_job.com_job_salary,
            com_job_num:com_job.com_job_num,
            com_job_edu:com_job.com_job_edu,
            com_job_exp:com_job.com_job_exp,
            com_job_type:com_job.com_job_type,
            com_job_desc:com_job.com_job_desc,
            com_job_publish_time:com_job.com_job_publish_time, 
            com_job_status:com_job.com_job_status,
            com_job_addr:com_job.com_job_ddr,  
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
            +"SET com_job='"+com_job.com_job+"' ,com_job_province = '"+com_job.com_job_province+"',"
            +"com_job_name='"+com_job.com_job_name+"',"
            +"com_job_city='"+com_job.com_job_city+"', com_job_salary='"+ com_job.com_job_salary+"',"
            +"com_job_num='"+com_job.com_job_num+"',com_job_status='"+com_job.com_job_status+"',"
            +"com_job_edu='"+com_job.com_job_edu+"',com_job_exp='"+com_job.com_job_exp+"',"
            +"com_job_type='"+com_job.com_job_type+"',com_job_desc='"+com_job.com_job_desc+"',"
            +"com_job_publish_time='"+com_job.com_job_publish_time+"',com_job_addr='"+com_job.com_job_addr+"'"
            +" WHERE com_job_id =  '"+com_job.com_job_id+"'";
            
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
            "FROM  com_job cj ,coms c" 
            +" WHERE cj.com_user_phone=c.com_user_phone and cj.com_job_id='"+com_job_id+"'";
        let result = await db.sequelize.query(sql, { type: db.sequelize.QueryTypes.SELECT });


        if (result.length > 0) {
            let com_job = result[0];
            com_job.com_job_publish_time=UTILS.formatDateTime(result[0].com_job_publish_time)
            return  com_job;
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
            +" WHERE com_user_phone='"+com_user_phone+"'";
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
        
        let result = await db.sequelize.query(sql, { type: db.sequelize.QueryTypes.SELECT });

        if (result.length > 0) {
            return result;
        } else {
            return false;
        }   
     
    },




}