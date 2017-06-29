let db = require('../db');

module.exports = {

    /**
      * 添加求职者信息
      * @method insertSeeker
      * 
      * @param  seerker
      * 
      */
    insertSeeker: async (seeker) => {

        await db.seekers.create({

            seeker_user_phone: seeker.seeker_user_phone,
            seeker_name: seeker.seeker_name,
            seeker_img: seeker.seeker_img,
            seeker_sex: seeker.seeker_sex,
            seeker_exp: seeker.seeker_exp,
            seeker_hukou: seeker.seeker_hukou,
            seeker_living: seeker.seeker_living,
            seeker_email: seeker.seeker_email,
            seeker_type: seeker.seeker_type,
            seeker_workcity: seeker.seeker_workcity,
            seeker_job: seeker.seeker_job,
            seeker_salary: seeker.seeker_salary,
            seeker_self: seeker.seeker_self,
            seeker_now: seeker.seeker_now,
            seeker_edu :seeker.seeker_edu,
        });

    },

    /**
    * 获取一个求职者信息
    * @author Vickey
    * 
    * @method getSeeker
    * 
    * @param {String} user_phone
    * 
    * @return bool or seeker 
    */
    getSeeker: async (seeker_user_phone) => {
        let res = false;

        let sql = "SELECT * FROM seekers "
            + " WHERE seeker_user_phone = '" + seeker_user_phone + "'";
        let result = await db.sequelize.query(sql, { type: db.sequelize.QueryTypes.SELECT });
        if (result.length > 0) {
            res = result[0];
        }
        return res;
    },


    /**
      * 
      * 更新求职者信息
      * @method updateSeeker
      * 
      * @param seerker
      * 待测试
      */
    updateSeeker: async (seeker) => {

        let sql = "UPDATE seekers "
            + " SET seeker_name = '" + seeker.seeker_name
            + "' , seeker_img='" + seeker.seeker_img + "', seeker_sex='" + seeker.seeker_sex
            + "',seeker_join='" + seeker.seeker_join + "',seeker_hukou='" + seeker.seeker_hukou + "',seeker_living= '" + seeker.seeker_living
            + "',seeker_email='" + seeker.seeker_email + "',seeker_type='" + seeker.seeker_type + "',seeker_workcity='" + seeker.seeker_workcity
            + "',seeker_job='" + seeker.seeker_job + "',seeker_salary = '" + seeker.seeker_job + "'"
            + " WHERE seeker_user_phone =  '" + seeker.seeker_user_phone + "'";

        await db.sequelize.query(sql, { type: db.sequelize.QueryTypes.UPDATE });


    },


    /**
       * 获取求职者所有教育信息
       * @method getSeeker_all_edu
       * 
       * @param seeker_phone
       * 
       * @return bool or seeker_edu[] 
       */
    getSeeker_all_edu: async (seeker_phone) => {
        let res = false;

        let sql = "SELECT * FROM seekers_edu "
            + " WHERE seeker_phone = '" + seeker_phone + "'";

        let result = await db.sequelize.query(sql, { type: db.sequelize.QueryTypes.SELECT });
        if (result.length > 0) {
            res = result;
        }
        return res;
    },

    /**
      * 获取求职者所有工作经历
      * @method getSeeker_all_exp
      * 
      * @param seeker_phone
      * 
      * @return bool or seeker_exp[] 
      */
    getSeeker_all_exp: async (seeker_phone) => {
        let res = false;

        let sql = "SELECT * FROM seekers_exp "
            + " WHERE seeker_phone = '" + seeker_phone + "'";

        let result = await db.sequelize.query(sql, { type: db.sequelize.QueryTypes.SELECT });
        if (result.length > 0) {
            res = result;
        }
        return res;
    },

    /**
     * 获取求职者所有证书
     * @method getSeeker_all_cert
     * 
     * @param seeker_phone
     * 
     * @return bool or seeker_cert[] 
     */
    getSeeker_all_cert: async (seeker_phone) => {
        let res = false;

        let sql = "SELECT * FROM seekers_exp "
            + " WHERE seeker_phone = '" + seeker_phone + "'";

        let result = await db.sequelize.query(sql, { type: db.sequelize.QueryTypes.SELECT });
        if (result.length > 0) {
            res = result;
        }
        return res;
    },

    /**
     * 获取求职者一条教育信息
     * @method getSeeker_edu
     * 
     * @param 
     * 
     * @return bool or seeker_edu 
     */
    getSeeker_edu: async (seeker_edu_id) => {
        let res = false;

        let sql = "SELECT * FROM seekers_edu "
            + " WHERE seeker_edu_id = '" + seeker_edu_id + "'";

        let result = await db.sequelize.query(sql, { type: db.sequelize.QueryTypes.SELECT });
        if (result.length > 0) {
            res = result[0];
        }
        return res;
    },

    /**
     * 获取求职者一条工作经历
     * @method getSeeker_exp
     * 
     * @param 
     * 
     * @return bool or seeker_exp
     */
    getSeeker_exp: async (seeker_exp_id) => {
        let res = false;

        let sql = "SELECT * FROM seekers_exp "
            + " WHERE seeker_exp_id = '" + seeker_exp_id + "'";

        let result = await db.sequelize.query(sql, { type: db.sequelize.QueryTypes.SELECT });
        if (result.length > 0) {
            res = result[0];
        }
        return res;
    },

    /**
 * 获取求职者一个证书
 * @method getSeeker_cert
 * 
 * @param 
 * 
 * @return bool or seeker_cert 
 */
    getSeeker_cert: async (seeker_certificate_id) => {
        let res = false;

        let sql = "SELECT * FROM seekers_certificate "
            + " WHERE seeker_certificate_id = '" + seeker_certificate_id + "'";

        let result = await db.sequelize.query(sql, { type: db.sequelize.QueryTypes.SELECT });
        if (result.length > 0) {
            res = result[0];
        }
        return res;
    },

    /**
      * 
      * 更新求职者教育信息
      * @method updateSeeker_edu
      * 
      * @param seeker_edu_id,seeker_edu
      * 
      */
    updateSeeker_edu: async (seeker_edu_id, seeker_edu) => {

        let sql = "UPDATE seekers_edu "
            + " SET seeker_edu_start = '" + seeker_edu.seeker_edu_start
            + "' , seeker_edu_end='" + seeker_edu.seeker_edu_end + "', seeker_edu_school='" + seeker_edu.seeker_edu_school
            + "',seeker_edu_profession='" + seeker_edu.seeker_edu_profession + "',seeker_edu_education='" + seeker_edu.seeker_edu_education + "'"
            + " WHERE seeker_edu_id =  '" + seeker_edu.id + "'";

        await db.sequelize.query(sql, { type: db.sequelize.QueryTypes.UPDATE });

    },

    /**
     * 
     * 更新求职者工作经历
     * @method updateSeeker_exp
     * 
     * @param seeker_exp_id,seeker_edu
     * 
     */
    updateSeeker_exp: async (seeker_exp_id, seeker_exp) => {

        let sql = "UPDATE seekers_exp "
            + " SET seeker_exp_start = '" + seeker_exp.seeker_exp_start
            + "' , seeker_exp_end='" + seeker_exp.seeker_exp_end + "', seeker_exp_com='" + seeker_exp.seeker_exp_com
            + "',seeker_exp_job='" + seeker_exp.seeker_exp_job + "',seeker_exp_salary='" + seeker_exp.seeker_exp_salary + "',seeker_exp_desc= " + seeker_exp.seeker_exp_comType
            + "',seeker_exp_comsize'" + seeker_exp.seeker_exp_comsize + "'"
            + " WHERE seeker_exp_id =  '" + seeker_exp.seeker_exp_id + "'";

        await db.sequelize.query(sql, { type: db.sequelize.QueryTypes.UPDATE });

    },

    /**
     * 
     * 更新求职者证书信息
     * @method updateSeeker_certificate
     * 
     * @param seeker_certificate_id,seeker_cert
     * 待测试
     */
    updateSeeker_cert: async (seeker_certificate_id, seeker_certificate) => {

        let sql = "UPDATE  seekers_certificate"
            + " SET seeker_phone='" + seeker_certificate.seeker_phone + "' ,seeker_cert_type = '" + seeker_certificate.seeker_cert_type
            + "' , seeker_cert_name='" + seeker_certificate.seeker_cert_name + "', seeker_cert_datetime='" + seeker_certificate.seeker_cert_datetime
            + " WHERE seeker_cert_id =  '" + seeker_certificate_id + "'";

        await db.sequelize.query(sql, { type: db.sequelize.QueryTypes.UPDATE });

    },


    /**
     * 
     * 删除求职者一条教育信息
     * @method deleteSeeker_edu
     * 
     * @param seeker_edu_id,seeker_edu
     * 待测试
     */
    deleteSeeker_edu: async (seeker_edu_id) => {

        let sql = "DELETE FROM seekers_edu WHERE seeker_edu_id = '" + seeker_edu_id+"'";

        await db.sequelize.query(sql, { type: db.sequelize.QueryTypes.DELETE });

    },

    /**
     * 
     * 删除求职者一条工作经历
     * @method deleteSeeker_exp
     * 
     * @param seeker_exp_id,seeker_edu
     * 待测试
     */
    deleteSeeker_exp: async (seeker_exp_id) => {


        let sql = "DELETE FROM seekers_exp WHERE seeker_exp_id = '" + seeker_exp_id+"'";

        await db.sequelize.query(sql, { type: db.sequelize.QueryTypes.DELETE });

    },

    /**
     * 
     * 删除求职者一条证书信息
     * @method deleteSeeker_certificate
     * 
     * @param seeker_certificate_id,seeker_cert
     * 待测试
     */
    deleteSeeker_cert: async (seeker_certificate_id) => {

        let sql = "DELETE FROM seekers_certificate WHERE seeker_cert_id = " + seeker_certificate_id;
        await db.sequelize.query(sql, { type: db.sequelize.QueryTypes.DELETE });

    },

     
    getSeeker_jobs: async (seeker_user_phone) => {
        let sql = "SELECT * FROM ";

    },
   //检索职位信息,通过地区，职位期望，薪水，公司电话,com_job
    getSomeJobs: async (ctx) => {

    },







}