
let parse = function parseUser(obj) {
    if (!obj) {
        return;
    }
    //  console.log('try parse: ' + obj);
    let s = '';
    if (typeof obj === 'string') {
        s = obj;
    } else if (obj.headers) {
        let cookies = new Cookies(obj, null);
        s = cookies.get('user_cookie');
    }
    if (s) {
        try {
            let user = JSON.parse(Buffer.from(s, 'base64').toString());
            //     console.log(`User: ${user.user_name}, ID: ${user.user_id}`);
            return user;
        } catch (e) {
            // ignore
        }
    }
}

//获取当前格式化时间 
let formatDateTime = function (date) {
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    m = m < 10 ? ('0' + m) : m;
    var d = date.getDate();
    d = d < 10 ? ('0' + d) : d;
    var h = date.getHours();
    var minute = date.getMinutes();
    minute = minute < 10 ? ('0' + minute) : minute;
    return y + '-' + m + '-' + d + ' ' + h + ':' + minute;
}

let getSeekerbyCTX = (ctx) => {
    let seeker = {};
    seeker.seeker_user_phone = ctx.request.body.seeker_user_phone;
    seeker.seeker_sex = ctx.request.body.seeker_sex;
    seeker.seeker_join = ctx.request.body.seeker_join;
    seeker.seeker_hukou = ctx.request.body.seeker_hukou;
    seeker.seeker_living = ctx.request.body.seeker_living;
    seeker.seeker_email = ctx.request.body.seeker_email;
    seeker.seeker_type = ctx.request.body.seeker_type;
    seeker.seeker_workcity = ctx.request.body.seeker_workcity;
    seeker.seeker_job = ctx.request.body.seeker_job;
    seeker.seeker_salary = ctx.request.body.seeker_salary;
    seeker.seeker_self = ctx.request.body.seeker_self;
    seeker.seeker_now = ctx.request.body.seeker_now;
    return seeker;
}

let getCombyCTX = (ctx) => {
    let com = {};
    com.com_user_phone = ctx.request.body.com_user_phone;
    com.com_name = ctx.request.body.com_name;
    com.com_hr = ctx.request.body.com_hr;
    com.com_img = ctx.request.body.com_img;
    com.com_date = ctx.request.body.com_date;
    com.com_type = ctx.request.body.com_type;
    com.com_email = ctx.request.body.com_email;
    com.com_tel = ctx.request.body.com_tel;
    com.com_capital = ctx.request.body.com_capital;
    com.com_province = ctx.request.body.com_province;
    com.com_city = ctx.request.body.com_city;
    com.com_country = ctx.request.body.com_country;
    com.com_addr = ctx.request.body.com_addr;
    com.com_desc = ctx.request.body.com_desc;
    com.com_verify = ctx.request.body.com_verify;
    com.com_scale = ctx.request.body.com_scale;
    com.com_website = ctx.request.body.com_website;
    com.com_label = ctx.request.body.com_label;
    return com;

}

let getCom_jobbyCTX =(ctx) =>{
    let com_job={};

com_job.com_job_id = ctx.request.body.com_job_id
com_job.com_user_phone = ctx.request.body.com_user_phone
com_job.com_job= ctx.request.body.com_job
com_job.com_job_name = ctx.request.body.com_job_name
com_job.com_job_province= ctx.request.body.com_job_province
com_job.com_job_city= ctx.request.body.com_job_city
com_job.com_job_salary = ctx.request.body.com_job_salary
com_job.com_job_num = ctx.request.body.com_job_num
com_job.com_job_edu = ctx.request.body.com_job_edu
com_job.com_job_exp = ctx.request.body.com_job_exp
com_job.com_job_type= ctx.request.body.com_job_type
com_job.com_job_desc= ctx.request.body.com_job_desc
com_job.com_job_publish_time= new Date();
com_job.com_job_status = ctx.request.body.com_job_status
com_job.com_job_addr= ctx.request.body.com_job_addr
    return com_job;

}


module.exports = {
    parse,
    formatDateTime,
    getSeekerbyCTX,
    getCombyCTX,
    getCom_jobbyCTX,

};