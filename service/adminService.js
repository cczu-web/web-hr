let userdao = require('../dao/usersDAO');
let admindao = require('../dao/adminDAO');

module.exports = {
    /**
     * 用户手机号是否存在验证
     * @author Vickey
     * 
     * @method userNameValid
     * 
     * @param {user_phone}
     * 
     * @return {bool}
     */
    userphone_Valid: async (ctx) => {

        let user_phone = ctx.params.user_phone;

        let result = userdao.user_phoneValid(user_phone);
        if (result)
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
        let user_role = 0;

        let msg = '账号密码错误';

        if (user_phone == '' || user_pwd == '')
            msg = '请输入账号密码';


        let result = await userdao.getUser(user_phone, user_pwd, user_role);

        if (result) {

            let user = result;

            user.user_pwd = '';

            //设置cookie
            let cookie_value = Buffer.from(JSON.stringify(user)).toString('base64');
            // ctx.cookies.set('admin_cookie', cookie_value, { signed: true, maxAge: 60 * 60 * 1000 });
            ctx.cookies.set('admin_cookie', cookie_value, { signed: true });
            console.log(`Set admin_cookie value: ${cookie_value}`);

          //  msg = '登录成功！手机号为' + user_phone;

          ctx.response.redirect('/');

        } else {
            ctx.render('index.html', {
                msg: msg,
            });
        }

    },

    /**
        * 查询所有企业信息,求职者信息
        * @method select_allcoms
        * 
        * 
        */
    r_select_allInfo :async(ctx) => {
        let way=ctx.params.way;
        if (way=='coms'){
             let coms = admindao.getAllcoms;
             ctx.render('a_allComs.html',{
              coms:coms,
             });
        }
        else if(way=='seekers'){
            let  seekers=admindao.getAllseeker;
             ctx.render('a_allSeekers.html',{
                 seekers:seekers,
             });
        
            
        }
       


    },
    //增加类别信息
    r_addTermInfo:async(ctx)=>{
        let way=ctx.params.way;
        if(way=='job'){
            let term_job={};
            term_job.term_job=ctx.request.body.term_job;
            term_job.parent_job=ctx.request.body.parent_id;
            await admindao.insertTerm_job(term_job);
        }
        else if(way=='edu'){
            let term_edu=ctx.request.body.term_edu;
            await admindao.insertTerm_edu(term_edu);
        }
        else if(way=='salary'){
            let term_salary=ctx.request.body.term_salary;
            await admindao.insertTerm_salary(term_salary);
        }
        ctx.response.redirect('');
    },
    
    /**
        * 查询单个企业信息
        * @method select_Onecom
        * 
        * 
        */
    select_Onecom :async() => {
        let com = await  admindao.getOnecom(com_phone);

    },
   
    /**
        * 查询所有信息
        * @method select_allcoms
        * 
        * 
        */
    select_Onecom :async() => {

    },

    /**
        * 查询所有企业信息
        * @method select_allcoms
        * 
        * 
        */
    select_allcoms :async() => {

        let coms = admindao.getAllcoms;


    },



    /**
        * 查询单个企业信息
        * @method select_Onecom
        * 
        * 
        */
    select_Onecom :async() => {
        let com = await  admindao.getOnecom(com_phone);

    },

    /**
        * 查询所有单个企业信息
        * @method select_allcoms
        * 
        * 
        */
    select_Onecom :async() => {

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
        ctx.response.redirect('login');

    },




}