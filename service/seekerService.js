var db = require('../db');
let userdao = require('../dao/usersDAO');
let seekerdao=require('../dao/seekersDAO');
module.exports = {

    /**
     * 用户手机号是否存在验证
     * 
     * @method userNameValid
     * 
     * @param  user_phone
     * 
     * @return {bool} 
     */
    userPhone_Valid: async (ctx) => {

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
     * 
     * @return {obj} 用户信息 or false     
     * 
     */
    loginValid: async (ctx) => {
    let user_phone = ctx.request.body.user_phone;
        let user_pwd = ctx.request.body.user_pwd;
        let user_role = 1;

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
            ctx.cookies.set('seeker_cookie', cookie_value, { signed: true });
            console.log(`Set seeker_cookie value: ${cookie_value}`);

           msg = '登录成功！手机号为' + user_phone;

             ctx.render('seeker_login.html', {
                msg: msg,
            });

        } else {
            ctx.render('seeker_login.html', {
                msg: msg,
            });
        }

    },
    //求职者注册-账号信息
    seekerRegister:async(user_phone,user_pwd)=>{
         await db.users.create({
            user_phone: user_phone,
            user_pwd: user_pwd,
            user_role: 1,
        });
        //return user_phone;
    },
    //求职者注册-基本信息
    insertSeeker:async(ctx)=>{

       let seeker_phone=ctx.request.body.seeker_phone;
       if(seeker_phone==''){
           
       }

    },
    //获取求职者信息
    getSeeker:async(seeker_phone)=>{
     
    },
    //更新求职者信息
    r_updateSeeker:async(seeker_phone)=>{
     
    },
    //添加求职者教育信息
    r_insertSeeker_edu:async(ctx,seeker_phone)=>{
     
    },
   //获取当前的求职者教育信息
   getOneSeeker_edu:async(seeker_phone)=>{

   },
   //获取一个教育信息
   getSeeker_edu:async(seeker_edu_id)=>{

   },
   //更新教育信息
   r_updateSeeker_edu:async(ctx,seeker_edu_id)=>{

   },
   //添加求职者工作经历
   r_insertSeeker_exp:async(ctx,seeker_phone)=>{
   
   },
   //获取当前求职者的工作经历
   getOneSeeker_exp:async(seeker_phone)=>{

   },
   //获取一个工作经历
   getSeeker_exp:async(seeker_exp_id)=>{

   },
   //更新求职者工作经历
   r_updateSeeker_exp:async(ctx,seeker_exp_id)=>{

   },
   //添加求职者证书
   r_insertSeeker_certifi :async(ctx,seeker_phone)=>{

   },
   //获取当前求职者的证书
   getOneSeeker_certi:async(seeker_phone)=>{

   },
   //获取一条证书信息
   getSeeker_certi:async(seeker_certi_id)=>{

   },
   //更新证书信息
   r_updateSeeker_certi:async(ctx,seeker_phone)=>{

   },
   //检索职位信息,通过地区，职位期望，薪水，公司电话,com_job
   getSomeJobs:async(ctx)=>{

   },
  //获取具体职位的具体信息,com_job_id->com_job
   getJobInfo:async(com_job_id)=>{

   },
   //获取求职者的职位申请,com_job,seeker_job
   r_getMySeeker_job:async(seeker_phone)=>{

   },
   //获取具体的职位申请的状态,seeker_job
   getSeekerJob_state:async(seeker_job_id)=>{

   },
   //更新职位申请的状态
   r_updateSeeker_job:async(ctx,seeker_phone)=>{

   },
   //添加职位申请,com_job_id,seeker_phone->seeker_job
   r_insertSeeker_job:async(ctx)=>{

   },
   


}