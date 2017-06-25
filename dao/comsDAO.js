let db = require('../db');

module.exports = {

<<<<<<< HEAD

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
=======
     /**
     * 添加公司信息
     * @method insertSeeker
     * @param  com
     * 
     */
    insertCom: async (com) => {
       
        let sql = "";
     
    },

 /**
     * 更新公司信息
     * @method updateSeeker
     * @param  com
     * 
     */
    updateCom: async (com) => {
       
        let sql = "";
     
    },
     /**
     * 获取一家公司信息
     * @method getSeeker
     * @param  com
     * 
     */
    getCom: async (com_user_phone) => {

     
    },

    /**
     * 发布一条招聘信息
     * @method insertCom_job
     * @param  com_job
     * 
     */
    insertCom_job: async (com_job) => {
       
     
    },

    /**
     * 更新一条招聘信息
     * @method updateCom_job
     * @param  com_job
     * 
     */
    updateCom_job: async (com_job) => {
       
     
    },

    /**
     * 获取一条招聘信息
     * @method getCom_job
     * @param  com_job_id
     * 
     */
    getCom_job: async (com_job_id) => {
       
     
    },

    /**
     * 获取公司已发布的所有招聘信息
     * @method getCom_all_job
     * @param  com_user_phone
     * 
     */
    getCom_job: async (com_user_phone) => {
       
     
    },


    /**
     * 查询一组招聘信息
     * @method getCom_job
     * @param  sql
     */
    getSomeJobs: async (sql) => {
       
     
    },



>>>>>>> d9edd10e8b46ef250d4cfc51f362b47456232716


}