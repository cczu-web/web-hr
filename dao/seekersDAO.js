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
       
        let sql = "";
     
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

        let sql = "SELECT * FROM Seekers "
            + " WHERE seeker_user_phone = '" + user_phone + "'";
        let result = await db.sequelize.query(sql, { type: db.sequelize.QueryTypes.SELECT });
        if (result.length > 0){
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
     * 
     */
    updateSeeker: async (seeker) => {
       
       
     
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

         let sql = "SELECT * FROM seeker_edu "
            + " WHERE seeker_phone = '" + seeker_phone + "'";

        let result = await db.sequelize.query(sql, { type: db.sequelize.QueryTypes.SELECT });
        if (result.length > 0){
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

         let sql = "SELECT * FROM seeker_exp "
            + " WHERE seeker_phone = '" + seeker_phone + "'";

        let result = await db.sequelize.query(sql, { type: db.sequelize.QueryTypes.SELECT });
        if (result.length > 0){
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
    getSeeker_all_cert: async (seeker_certificate) => {
        let res = false;

         let sql = "SELECT * FROM seeker_exp "
            + " WHERE seeker_phone = '" + seeker_phone + "'";

        let result = await db.sequelize.query(sql, { type: db.sequelize.QueryTypes.SELECT });
        if (result.length > 0){
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

        let sql = "SELECT * FROM seeker_edu "
            + " WHERE seeker_edu_id = '" + seeker_edu_id + "'";

        let result = await db.sequelize.query(sql, { type: db.sequelize.QueryTypes.SELECT });
        if (result.length > 0){
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

        let sql = "SELECT * FROM seeker_exp "
            + " WHERE seeker_exp_id = '" + seeker_edu_id + "'";

        let result = await db.sequelize.query(sql, { type: db.sequelize.QueryTypes.SELECT });
        if (result.length > 0){
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

        let sql = "SELECT * FROM seeker_certificate "
            + " WHERE seeker_certificate_id = '" + seeker_edu_id + "'";

        let result = await db.sequelize.query(sql, { type: db.sequelize.QueryTypes.SELECT });
        if (result.length > 0){
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
    updateSeeker_edu: async (seeker_edu_id,seeker_edu) => {
       
    
     
    },

    /**
     * 
     * 更新求职者工作经历
     * @method updateSeeker_exp
     * 
     * @param seeker_exp_id,seeker_edu
     * 
     */
    updateSeeker_exp: async (seeker_exp_id,seeker_exp) => {
       
    
     
    },

    /**
     * 
     * 更新求职者证书信息
     * @method updateSeeker_certificate
     * 
     * @param seeker_certificate_id,seeker_cert
     * 
     */
    updateSeeker_cert: async (seeker_certificate_id,seeker_certificate) => {
       
    
     
    },


    /**
     * 
     * 删除求职者一条教育信息
     * @method deleteSeeker_edu
     * 
     * @param seeker_edu_id,seeker_edu
     * 
     */
    deleteSeeker_edu: async (seeker_edu_id,seeker_edu) => {
       
    
     
    },

    /**
     * 
     * 删除求职者一条工作经历
     * @method deleteSeeker_exp
     * 
     * @param seeker_exp_id,seeker_edu
     * 
     */
    deleteSeeker_exp: async (seeker_exp_id,seeker_exp) => {
       
    
     
    },

    /**
     * 
     * 删除求职者一条证书信息
     * @method deleteSeeker_certificate
     * 
     * @param seeker_certificate_id,seeker_cert
     * 
     */
    deleteSeeker_cert: async (seeker_certificate_id,seeker_certificate) => {
       
    
     
    },







}