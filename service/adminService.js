var db = require('../db');

module.exports = {
    /**
     * 用户手机号是否存在验证
     * @author Vickey
     * 
     * @method userNameValid
     * 
     * @param {String} user_phone
     * 
     * @return {bool} 
     */
    userNameValid: async (user_phone) => {
        let sql = "SELECT * FROM users "
            + " WHERE user_phone = '" + user_phone + "'";

        let result = await db.sequelize.query(sql, { type: db.sequelize.QueryTypes.SELECT });

        if (result.length > 0)
            return true;
        else
            return false;
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
    loginValid: async (ctx) => {


    let user_phone = ctx.request.body.user_phone;
    let user_pwd = ctx.request.body.user_pwd;
    
        let msg = '账号密码错误';

        let res = false;

        if (user_phone == '' || user_pwd == '')
            msg = '请输入账号密码';

        let sql = "SELECT * FROM users "
            + " WHERE user_phone = '" + user_phone + "'"
            + " AND user_pwd = '" + user_pwd + "'";

        let result = await db.sequelize.query(sql, { type: db.sequelize.QueryTypes.SELECT });

        if (result.length > 0) {

            let user = result[0];
            user.user_pwd = '';

            //设置cookie
            let cookie_value = Buffer.from(JSON.stringify(user)).toString('base64');
            // ctx.cookies.set('admin_cookie', cookie_value, { signed: true, maxAge: 60 * 60 * 1000 });
            ctx.cookies.set('admin_cookie', cookie_value, { signed: true });
            console.log(`Set admin_cookie value: ${cookie_value}`);

            msg = '登录成功！手机号为' + user_phone;
            res = user;
        }
        if (res) {
            ctx.render('index.html', {
                msg: msg,
            });
        } else {
            ctx.render('index.html', {
                msg: msg,
            });
        }
        //  return {msg,res};

    },


    /**
        * 用户退出
        * @method logout
        * 
        * 
        */
    logout: async (ctx) => {

        ctx.cookies.set('admin_cookie', '');
        console.log('admin logout !');
        ctx.response.redirect('/');

    },




}