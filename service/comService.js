
var db = require('../db');
let userdao = require('../dao/usersDAO');
let comdao = require('../dao/comsDAO');
let seek_jobDAO = require('../dao/seek_jobDAO');
let UTILS = require('../utils');
module.exports = {

    //登陆
    loginValid: async (ctx) => {
        let user_phone = ctx.request.body.user_phone;
        let user_pwd = ctx.request.body.user_pwd;
        let user_role = 2;

        let msg = '账号密码错误';

        let result = false;

        if (user_phone == '' || user_pwd == '')
            msg = '请输入账号密码';
        else
            result = await userdao.getUser(user_phone, user_pwd, user_role);


        if (result) {

            let com = await comdao.getCom(user_phone);

            //设置cookie
            let cookie_value = Buffer.from(JSON.stringify(com)).toString('base64');
            ctx.cookies.set('com_cookie', cookie_value, { signed: true });
            console.log(`Set com_cookie value: ${cookie_value}`);

            ctx.response.redirect('/com/index');

        } else {
            ctx.render('c_login.html', {

                msg: msg,
            });
        }
    },

    r_comIndex: async (ctx) => {

        let com = ctx.state.com;

        ctx.render('c_index.html', {
            nowUser: 'com',
            title: com.com_name,
            com: com,

        });
    },

    //如果传的info，那么更新info
    r_com_my: async (ctx) => {
        let way = ctx.params.way;
        let com = ctx.state.com;
        if (way == 'info') {
            ctx.render('c_info.html', {
                nowUser: 'com',
                title: '我的信息',
                com: ctx.state.com
            });

        }
        else {

            let jobs = comdao.getAllCom_job(com.com_user_phone);
            ctx.render('c_all_job.html', {
                nowUser: 'com',
                title: '所有职位',
                jobs: jobs
            });

        }
    },



    r_getCom_job: async (ctx) => {
        let com_job_id = ctx.params.id;
        let com_job = await comdao.getCom_job(com_job_id);

        ctx.render('c_job.html', {
            nowUser: 'com',
            title: com_job.com_job_name,
            com_job: com_job
        });
    },

    //公司信息更新，公司招聘信息更新
    //info,job
    r_com_update: async (ctx) => {
        let way = ctx.params.way;

        if (way == 'info') {
            let com = UTILS.getCombyCTX(ctx);
            await comdao.updateCom(com);
            let cookie_value = Buffer.from(JSON.stringify(com)).toString('base64');
            ctx.cookies.set('com_cookie', cookie_value, { signed: true });
            ctx.response.redirect('/com/my/info');

        } else {
            let com_job = UTILS.getCom_jobbyCTX(ctx);
            comdao.updateCom_job(com_job);
            seek_jobDAO.updateAll_seeker_status(com_job.com_user_phone, com_job.com_job_id);
            ctx.response.redirect('/job_info/' + com_job.com_job_id);
        }

    },

    //发布职位
    r_com_publish_job: async (ctx) => {
        let job = UTILS.getCom_jobbyCTX(ctx);

        comdao.insertCom_job(com_job);
        //     ctx.response.redirect('/job_info/' + com_job.com_job_id);


    },
    //获取一个职位的所有申请信息
    getAllSeeks_job: async (ctx) => {
        let com = ctx.state.com;
        let com_job_id = ctx.params.id;
        let seekers = seek_jobDAO.getAll_seek_job(com.com_user_phone, com_job_id)
        ctx.render('c_seekers.html', {
            nowUser: 'com',
            title: '所有申请者',
            com: com,
            seekers: seekers

        });
    },
    //选定求职者
    selectSeeker: async (ctx) => {
        let com = ctx.state.com;
        ctx.request.body.seeker_user_phone;

    }

}