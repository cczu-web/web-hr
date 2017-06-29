let userdao = require('../dao/usersDAO');
let admindao = require('../dao/adminDAO');
let seekerdao = require('../dao/seekersDAO');
let comdao = require('../dao/comsDAO');
let seek_jobDAO = require('../dao/seek_jobDAO');
let UTILS = require('../utils');

let getUser =(ctx)=>{
       if(ctx.state.seeker != null) {
           return 'seeker'
       }
       if(ctx.state.com != null) {
           return 'com'
       }
    
           return 'null'
       
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
            let seeker ={}
            seeker.seeker_user_phone =  user.user_phone
                ctx.render('s_register.html', {
                    seeker:seeker
                });
            }else if (user.user_role == '2'){//招聘
                 let com ={}
            com.com_user_phone =  user.user_phone
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
            com:com,
            nowUser:getUser(ctx),
             seekerUser: ctx.state.seeker,
             comUser: ctx.state.com

         
        });
    },

     //查看一家公司的信息
    r_com_info:async(ctx)=>{
        let com_id=ctx.params.id;
        let comInfo =await comdao.getCom(com_id);
        ctx.render('com_info.html',{
           comInfo:comInfo,

        })
    },
    //查看个人简历,是否具有修改求职者的权限 
    r_one_seekInfo: async (ctx) => {
        let seek_job_id = ctx.params.id;
        let seekInfo = await seek_jobDAO.getOneSeekerInfo(seek_job_id);
        ctx.render('seekerInfo.html', {
            seekInfo: seekInfo,
        });
    },
    //求职者搜索职位信息

    r_search_job: async (ctx) => {
        let searchStr = ctx.request.body.searchStr;

    }
}