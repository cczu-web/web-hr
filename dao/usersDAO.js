let db = require('../db');

module.exports = {



     /**
     * 用户手机号是否存在验证
     * @author Vickey
     * 
     * @method user_phoneValid
     * 
     * @param {String} user_phone
     * 
     * @return {bool} 
     */
    user_phoneValid: async (user_phone) => {
        let sql = "SELECT * FROM users "
            + " WHERE user_phone = '" + user_phone + "'";
        let result = await db.sequelize.query(sql, { type: db.sequelize.QueryTypes.SELECT });
        if (result.length > 0)
            return true;
        else
            return false;
    },



    /**
     * 用户登陆
     * @method getUser
     * 
     * @param {String} user_phone  用户手机号
     * @param {String} user_pwd 密码
     * @param {String} user_role 角色
     * 
     * @return user 用户信息 or false     
     * 
     */
    getUser: async (user_phone,user_pwd,user_role) => {

        let res = false;

        let sql = "SELECT * FROM users "
            + " WHERE user_phone = '" + user_phone + "'"
            + " AND user_pwd = '" + user_pwd + "'"
            + " AND user_role = '"+user_role+"'";

        let result = await db.sequelize.query(sql, { type: db.sequelize.QueryTypes.SELECT });

        if (result.length > 0) {

            let user = result[0];

            res = user;
        }
          return res;

    },

    /**
     * 插入用户数据
     * @method insertUser
     * 
     * @param {String} user_phone  用户手机号
     * @param {String} user_pwd 密码
     * @param {String} user_role 角色
     * 
     * 
     */
    insertUser: async (user) => {
      await db.users.create({
            user_phone: user.user_phone,
            user_pwd: user.user_pwd,
            user_role: user.user_role,
        });


    },

        /**
     * 更新用户数据
     * @method insertUser
     * 
     * @param {String} user_phone  用户手机号
     * @param {String} user_pwd 密码
     * @param {String} user_role 角色
     * 
     */
    updateUser: async (user_phone,user_pwd,user_role) => {



    },







}