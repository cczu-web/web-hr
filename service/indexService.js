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

let com_job_type_add = (com_job,type, value) => {

    if (type == 'com_job') com_job.com_job = value;
    if (type == 'com_job_city')com_job.com_job_city = value;
    if (type == 'com_job_salary')com_job.com_job_salary = value;
    if (type == 'com_job_edu') com_job.com_job_edu = value;
    if (type == 'com_job_exp') com_job.com_job_exp = value;
    if (type == 'com_job_type') com_job.com_job_type = value;
    return com_job;

}
let getCom_job_sql = () => {
    let sql = "SELECT * FROM com_job,coms "
        + " where com_job.com_user_phone = coms.com_user_phone";
    if (global.search_com_job.com_job != '') sql + " AND com_job="+global.search_com_job.com_job;
    if (global.search_com_job.com_job_city != '') sql + " AND com_job_city="+global.search_com_job.com_job_city;
    if (global.search_com_job.com_job_salary != '') sql + " AND com_job_salary="+global.search_com_job.com_job_salary;
    if (global.search_com_job.com_job_edu != '') sql + " AND com_job_edu="+global.search_com_job.com_job_edu;
    if (global.search_com_job.com_job_exp != '') sql + " AND com_job_exp = "+global.search_com_job.com_job_exp;
    if (global.search_com_job.com_job_type != '') sql + " AND com_job_type="+global.search_com_job.com_job_type;

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

        let com_job = await comdao.getCom_job(job_id);
        let com = await comdao.getCom(com_job.com_user_phone);


        ctx.render('job_info.html', {
            com_job: com_job,
            com: com,
            nowUser: getUser(ctx),
            seekerUser: ctx.state.seeker,
            comUser: ctx.state.com


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

         if (!ctx.cookies.get('search_com_job')){
          let com_job = { com_job: '', com_job_city: '', com_job_salary: '', com_job_edu: '', com_job_exp: '', com_job_type: '' };
            let search_com_job = Buffer.from(JSON.stringify(com_job)).toString('base64');
            ctx.cookies.set('search_com_job', search_com_job, { signed: true });
}else{
    let search_com_job  = UTILS.parse(ctx.cookies.get('seeker_cookie'));

}
        ctx.render('joblist.html', {
            nowUser: getUser(ctx),
            seekerUser: ctx.state.seeker,
            comUser: ctx.state.com

        });

    },
    r_search_job_add: async (ctx) => {

        let type = ctx.params.type;
        let value = ctx.params.value;
        let sql = com_job_type_add(type, value);

          let com_job  = UTILS.parse(ctx.cookies.get('seeker_cookie'));

        let results = await comdao.getSomeJobs(sql);

        ctx.render('joblist.html', {
            search_com_job:  global.search_com_job ,
            results,results,
            nowUser: getUser(ctx),
            seekerUser: ctx.state.seeker,
            comUser: ctx.state.com

        });

    }
}