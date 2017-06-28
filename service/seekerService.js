var db = require('../db');
let userdao = require('../dao/usersDAO');
let seekerdao = require('../dao/seekersDAO');
let UTILS = require('../utils');
module.exports = {


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
            let seeker = await seekerdao.getSeeker(user_phone);

            //设置cookie
            let cookie_value = Buffer.from(JSON.stringify(seeker)).toString('base64');
            // ctx.cookies.set('admin_cookie', cookie_value, { signed: true, maxAge: 60 * 60 * 1000 });
            ctx.cookies.set('seeker_cookie', cookie_value, { signed: true });
            console.log(`Set seeker_cookie value: ${cookie_value}`);

            ctx.response.redirect('/seeker/index');

        } else {
               ctx.render('s_login.html', {
                   msg : msg

      });
        }

    },



    r_seekerIndex: async (ctx) => {

        let seeker = ctx.state.seeker;

        let seeker_edu = await seekerdao.getSeeker_all_edu(seeker.seeker_user_phone);
        let seeker_exp = await seekerdao.getSeeker_all_exp(seeker.seeker_user_phone);

        ctx.render('s_index.html', {
            seeker: seeker,
            seeker_edu: seeker_edu,
            seeker_exp: seeker_exp
        });
    },

    /**
     * info 更新个人信息
     * expect 更新期望职业信息
     * edu 更新教育信息
     * exp 更新工作经历
     */
    //更新seeker
    r_seeker_update: async (ctx) => {
        let way = ctx.params.way;
        let seeker = ctx.state.seeker;

        if (way == 'info') {

            seeker = UTILS.getSeekerbyCTX(ctx);

            await seeker.updateSeeker(seeker);

            //更新cookie
            //   seeker = await seekerdao.getSeeker(seeker.seeker_user_phone);
            let cookie_value = Buffer.from(JSON.stringify(seeker)).toString('base64');
            ctx.cookies.set('seeker_cookie', cookie_value, { signed: true });
        }

        else if (way == 'expect') {

            seeker.seeker_type = ctx.request.body.seeker_type;
            seeker.seeker_workcity = ctx.request.body.seeker_workcity;
            seeker.seeker_job = ctx.request.body.seeker_job;
            seeker.seeker_salary = ctx.request.body.seeker_salary;
            //     console.log("ctx.request.body.seeker_salary" + ctx.request.body.seeker_salary)

            await seekerdao.updateSeeker(seeker);

            //更新cookie
            seeker = await seekerdao.getSeeker(seeker.seeker_user_phone);
            let cookie_value = Buffer.from(JSON.stringify(seeker)).toString('base64');
            ctx.cookies.set('seeker_cookie', cookie_value, { signed: true });

        }

        else if (way == 'edu') {

            let seeker_edu;
            seeker_edu.seeker_edu_id = ctx.request.body.seeker_edu_id;
            seeker_edu.seeker_edu_start = ctx.request.body.seeker_edu_start;
            seeker_edu.seeker_edu_end = ctx.request.body.seeker_edu_end;
            seeker_edu.seeker_edu_school = ctx.request.body.seeker_edu_school;
            seeker_edu.seeker_edu_profession = ctx.request.body.seeker_edu_profession;
            seeker_edu.seeker_edu_education = ctx.request.body.seeker_edu_education;

            await seekerdao.updateSeeker_edu(seeker_edu);

        }

        else if (way == 'exp') {
            let seeker_exp;

            seeker_exp.seeker_exp_id = ctx.request.body.seeker_exp_id
            seeker_exp.seeker_exp_start = ctx.request.body.seeker_exp_start
            seeker_exp.seeker_exp_end = ctx.request.body.seeker_exp_end
            seeker_exp.seeker_exp_com = ctx.request.body.seeker_exp_com
            seeker_exp.seeker_exp_job = ctx.request.body.seeker_exp_job
            seeker_exp.seeker_exp_salary = ctx.request.body.seeker_exp_salary
            seeker_exp.seeker_exp_desc = ctx.request.body.seeker_exp_desc
            seeker_exp.seeker_exp_comType = ctx.request.body.seeker_exp_comType
            seeker_exp.seeker_exp_comSize = ctx.request.body.seeker_exp_comSize

            await seekerdao.updateSeeker_exp(seeker_exp);

        }
        ctx.response.redirect('/seeker/index');
    },

    //删除一条教育信息或工作经历
    r_seeker_delete: async (ctx) => {
        let way = ctx.params.way;
        let id = ctx.params.id;
        if (way == 'edu') await seekerdao.deleteSeeker_edu(id);

        if (way == 'exp') await seekerdao.deleteSeeker_exp(id);

        ctx.response.redirect('/seeker/index');
    },



    //查看所有已经申请的职位
    r_seeker_all_job: async (ctx) => {

        let seeker = ctx.state.seeker;
        seeker.seeker_user_phone;

        //     let jobs = await 


        ctx.render('s_jobs.html', {
            seeker: seeker,

        });

    },





    //检索职位信息,通过地区，职位期望，薪水，公司电话,com_job
    getSomeJobs: async (ctx) => {

    },


    //获取具体的职位申请的状态,seeker_job
    getSeekerJob_state: async (seeker_job_id) => {

    },
    //更新职位申请的状态
    r_updateSeeker_job: async (ctx, seeker_phone) => {

    },
    //添加职位申请,com_job_id,seeker_phone->seeker_job
    r_insertSeeker_job: async (ctx) => {

    },



}