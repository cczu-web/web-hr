
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
            comUser: ctx.state.com

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
                com: ctx.state.com,
                comUser: ctx.state.com
            });

        }
        else {

            let jobs = comdao.getAllCom_job(com.com_user_phone);
            ctx.render('c_all_job.html', {
                nowUser: 'com',
                title: '所有职位',
                jobs: jobs,
                comUser: ctx.state.com

            });

        }
    },


    r_getCom_job: async (ctx) => {
        let com_job_id = ctx.params.id;
        let com_job = await comdao.getCom_job(com_job_id);
        let com = ctx.params.com;

        ctx.render('c_job.html', {
            nowUser: 'com',
            title: com_job.com_job_name,
            com: com,
            com_job: com_job,
            comUser: ctx.state.com
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
            console.log(com_job)
            await comdao.updateCom_job(com_job);
            await seek_jobDAO.updateAll_seeker_status(com_job.com_user_phone, com_job.com_job_id);
            ctx.response.redirect('/job_info/' + com_job.com_job_id);
        }

    },

    //发布职位
    r_com_publish_job: async (ctx) => {
        let com_job = UTILS.getCom_jobbyCTX(ctx);
                console.log(ctx.request.body.com_job_type);
        
        console.log(com_job);
        await comdao.insertCom_job(com_job);
        
        ctx.response.redirect('/com/my/job/1');


    },

    r_com_some_jobs: async (ctx) => {
        let state = ctx.params.state;
        let com = ctx.state.com;

        let title = '已发布职位'
        let sql = "SELECT * ,date_format(com_job_publish_time,'%Y-%m-%d' '%H:%i')as com_job_f_time" +
            " FROM  com_job"
            + " WHERE com_user_phone='" + com.com_user_phone + "'"
            + " AND com_job_status = '" + state + "'";

        let com_jobs = await comdao.getSomeJobs(sql);
        if (state == '1') {

        } else {
            title = '已下线职位'
        }

        ctx.render('c_positions.html', {
            nowUser: 'com',
            title: title,
            com: com,
            com_jobs: com_jobs,
            state: state, //用来页面判断显示状态
            comUser: ctx.state.com

        });
    },
    //获取所有申请信息
    getSomeSeeks: async (ctx) => {
        let state = ctx.params.state;
        let title = '简历'
        let com = ctx.state.com;
        let res = await seek_jobDAO.getSomeSeeks(com.com_user_phone, state);

        if (state == -1) title = '不合适简历';
        if (state == 0) title = '待确认';
        if (state == 1) title = '已通知面试简历';
        if (state == 2) title = '待查看简历';
        if (state == 3) title = '已查看简历';

        ctx.render('c_cvs.html', {
            nowUser: 'com',
            title: title,
            com: com,
            seekers: res,
            state: state,
            comUser: ctx.state.com

        });
    },
    //选定求职者
    selectSeeker: async (ctx) => {
         let way =ctx.params.way;
        let seek_job_id =ctx.params.id;
        let seek_job_verify = 2; 
        if(way == 'select')seek_job_verify =1;
        if(way == 'cancel') seek_job_verify = -1;
      
       await seek_jobDAO.updateOneSeek_job(seek_job_id,seek_job_verify);
  ctx.response.redirect('/com/job/cv/' + seek_job_verify);

    }

}