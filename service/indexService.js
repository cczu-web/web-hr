let userdao = require('../dao/usersDAO');
let admindao = require('../dao/adminDAO');
let seekerdao = require('../dao/seekersDAO');
let comdao = require('../dao/comsDAO');
let seek_jobDAO = require('../dao/seek_jobDAO');
let UTILS = require('../utils');

let getUser = (ctx) => {
    if (ctx.state.seeker != null) {
        return 'seeker'
    }
    if (ctx.state.com != null) {
        return 'com'
    }
    return 'null'
}

let com_job_type_add = (ctx, type, value) => {
    let com_job = UTILS.parse(ctx.cookies.get('search_com_job'));
    if (value == '不限') return com_job;
    if (type == 'com_job_city') com_job.com_job_city = value;
    if (type == 'com_job_salary') com_job.com_job_salary = value;
    if (type == 'com_job_edu') com_job.com_job_edu = value;
    if (type == 'com_job_exp') com_job.com_job_exp = value;
    if (type == 'com_job_type') com_job.com_job_type = value;

    if (type == 'com_job') {
        com_job = { com_job: '', com_job_city: '', com_job_salary: '', com_job_edu: '', com_job_exp: '', com_job_type: '' };
        com_job.com_job = value;
    } else {
        com_job.com_job = '';
    }

    //设置cookie
    let cookie_value = Buffer.from(JSON.stringify(com_job)).toString('base64');
    ctx.cookies.set('search_com_job', cookie_value, { signed: true });

    return com_job;

}
let getCom_job_sql = (com_job) => {

    let sql = "SELECT *,date_format(com_job_publish_time,'%Y-%m-%d' '%H:%i') as com_job_f_time FROM com_job,coms "
        + " where com_job.com_user_phone = coms.com_user_phone";
    if (com_job.com_job != '') sql = sql + " AND com_job='" + com_job.com_job + "'";
    if (com_job.com_job_city != '') sql = sql + " AND com_job_city='" + com_job.com_job_city + "'";
    if (com_job.com_job_salary != '') sql = sql + " AND com_job_salary='" + com_job.com_job_salary + "'";
    if (com_job.com_job_edu != '') sql = sql + " AND com_job_edu='" + com_job.com_job_edu + "'";
    if (com_job.com_job_exp != '') sql = sql + " AND com_job_exp = '" + com_job.com_job_exp + "'";
    if (com_job.com_job_type != '') sql = sql + " AND com_job_type='" + com_job.com_job_type + "'";

    return sql;
}


module.exports = {

    r_index: async (ctx) => {


        ctx.render('index.html', {

            nowUser: getUser(ctx),
            seekerUser: ctx.state.seeker,
            comUser: ctx.state.com
        });



    },


    r_seekerRegister: async (ctx) => {
        let step = ctx.params.step;

        if (step == 'valid') {

            let res = await userdao.user_phoneValid(user_phone);

        }
        else if (step == 'step1') {
            let user = {};
            user.user_phone = ctx.request.body.user_phone;
            user.user_pwd = ctx.request.body.user_pwd;
            user.user_role = ctx.request.body.user_role;
            await userdao.insertUser(user);

            if (user.user_role == '1') {//求职
                let seeker = {}
                seeker.seeker_user_phone = user.user_phone
                ctx.render('s_register.html', {
                    seeker: seeker
                });
            } else if (user.user_role == '2') {//招聘
                let com = {}
                com.com_user_phone = user.user_phone
                ctx.render('c_register.html', {
                    com: com
                });
            }
        }//求职者注册-基本信息
        else if (step == 'seeker_step') {

            let seeker = UTILS.getSeekerbyCTX(ctx);
            await seekerdao.insertSeeker(seeker);

            //设置cookie
            let cookie_value = Buffer.from(JSON.stringify(seeker)).toString('base64');
            ctx.cookies.set('seeker_cookie', cookie_value, { signed: true });

            ctx.response.redirect('/seeker/index');


        }//企业基本信息注册
        else if (step == 'com_step') {

            let com = UTILS.getCombyCTX(ctx);
            await comdao.insertSeeker(seeker);

            //设置cookie
            let cookie_value = Buffer.from(JSON.stringify(com)).toString('base64');
            ctx.cookies.set('com_cookie', cookie_value, { signed: true });

            ctx.response.redirect('/com/index');
        }
    },

    //查看一条职位信息
    r_JobInfo: async (ctx) => {
        let job_id = ctx.params.id;
        let seek_verify = 4;
        if(ctx.state.seeker!=null) seek_verify = await seek_jobDAO.getOneSeek(job_id, ctx.state.seeker.seeker_user_phone);
        let jobInfo = await comdao.getCom_job(job_id);
        let com = await comdao.getCom(jobInfo.com_user_phone);
    

        ctx.render('job_info.html', {
            title:jobInfo.com_job,
            com_job: jobInfo,
            nowUser: getUser(ctx),
             comUser: ctx.state.com,
             seekerUser: ctx.state.seeker,
            seeker: ctx.state.seeker,
            com: com,
            seek_verify: seek_verify
        });

    },

    //查看一家公司的信息
    r_com_info: async (ctx) => {
        let com_id = ctx.params.id;
        let comInfo = await comdao.getCom(com_id);
        ctx.render('c_info.html', {
            comInfo: comInfo,
            nowUser: getUser(ctx),
            seekerUser: ctx.state.seeker,
            comUser: ctx.state.com

        })
    },
    //查看个人简历,是否具有修改求职者的权限 
    r_one_seekInfo: async (ctx) => {
        let seek_job_id = ctx.params.id;
        let seekInfo = await seek_jobDAO.getOneSeekerInfo(seek_job_id);
        ctx.render('s_info.html', {
            seekInfo: seekInfo,
            nowUser: getUser(ctx),
            seekerUser: ctx.state.seeker,
            comUser: ctx.state.com
        });
    },
    //求职者搜索职位信息

    r_search_job: async (ctx) => {

        let com_job = { com_job: '', com_job_city: '', com_job_salary: '', com_job_edu: '', com_job_exp: '', com_job_type: '' };
        let search_com_job = Buffer.from(JSON.stringify(com_job)).toString('base64');
        ctx.cookies.set('search_com_job', search_com_job, { signed: true });

        if (ctx.request.body.s_com_job != undefined) com_job.com_job = ctx.request.body.s_com_job;
        let results = await comdao.getSomeJobs(getCom_job_sql(com_job));

        let term_edu = await admindao.getTerm_edu();
        let term_exp = await admindao.getTerm_exp();
        let term_job = await admindao.getTerm_job();
        let term_salary = await admindao.getTerm_salary();

        ctx.render('joblist.html', {

            term_edu: term_edu,
            term_exp: term_exp,
            term_job: term_job,
            term_salary: term_salary,
            title: '职位搜索',
            nowUser: getUser(ctx),
            seekerUser: ctx.state.seeker,
            comUser: ctx.state.com,
            results: results

        });

    },
    r_search_job_add: async (ctx) => {

        let type = ctx.params.type;
        let value = ctx.params.value;
        let com_job = com_job_type_add(ctx, type, value);

        let sql = getCom_job_sql(com_job);

        let results = await comdao.getSomeJobs(sql);

        let term_edu = await admindao.getTerm_edu();
        let term_exp = await admindao.getTerm_exp();
        let term_job = await admindao.getTerm_job();
        let term_salary = await admindao.getTerm_salary();

        ctx.render('joblist.html', {
            term_edu: term_edu,
            term_exp: term_exp,
            term_job: term_job,
            term_salary: term_salary,
            title: '职位搜索',
            search_com_job: com_job,
            results, results,
            nowUser: getUser(ctx),
            seekerUser: ctx.state.seeker,
            comUser: ctx.state.com

        });

    }
}