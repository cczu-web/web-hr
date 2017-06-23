var db = require('../db');

module.exports = {

    /**
     * 用户名称是否存在验证
     * @method userNameValid
     * 
     * @param {String} user_login
     * 
     * @return {bool} 
     */
    userNameValid: async (user_login)=>{

      

    },

    /**
     * 用户邮箱是否存在验证
     * @method userEmailValid
     * 
     * @param {String} user_email
     * 
     * @return {bool} 
     */
    userNameValid: async (user_email)=>{

      

    },


    /**
     * 用户登陆验证
     * @method loginValid
     * 
     * @param {String} user_login  用户名或邮箱
     * @param {String} user_pwd 密码
     * 
     * @return {obj} 用户信息 or false     
     * 
     */
    loginValid : async (user_login,user_pwd) => {


return true;




   /*     let sql = "SELECT * FROM popular.pop_users "
                  +" WHERE (user_login = '"+ user_login + "' or user_email = '" + user_login+"')"
                  +" AND user_pwd = '"+ user_pwd +"'"
        
        let result = await db.sequelize.query(sql, { type: db.sequelize.QueryTypes.SELECT });

        if(result.length>0){
            let user = result[0];
            user.user_pwd = '';
            return user;
        }else{
            return false;
        }*/

    },

}