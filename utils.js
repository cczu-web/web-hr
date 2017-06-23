
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
let  formatDateTime = function (date) {
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    m = m < 10 ? ('0' + m) : m;
    var d = date.getDate();
    d = d < 10 ? ('0' + d) : d;
    var h = date.getHours();
    var minute = date.getMinutes();
    minute = minute < 10 ? ('0' + minute) : minute;
    return y + '-' + m + '-' + d+' '+h+':'+minute;
}


module .exports = {
    parse,
    formatDateTime
};