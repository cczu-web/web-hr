'use strict';

const Koa = require('koa');
const app = new Koa();

const Cookies = require('cookies');
const router = require('koa-router')();
const staticServer = require('koa-static');


const convert = require('koa-convert');
const json = require('koa-json');

const bodyparser = require('koa-bodyparser')();
const templating = require('./templating');

const isProduction = true ; //开发环境为false，生产环境为true;

const index = require('./routes/index');

const admin = require('./routes/admin');

const seeker = require('./routes/seeker');

const com = require('./routes/com');

//const users = require('./routes/users');
//const api = require('./routes/api');


const UTILS = require('./utils');
 


// middlewares
app.use(convert(bodyparser));
app.use(convert(json()));


// log request URL:
app.use(async (ctx, next) => {

    let pattern = /css|js|jpg|png|gif/; 
    if(!pattern.test(ctx.request.url))
        console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
    var
        start = new Date().getTime(),
        execTime;
    await next();
    execTime = new Date().getTime() - start;
    ctx.response.set('X-Response-Time', `${execTime}ms`);
});

app.keys  = ['im a newer secret', 'i like turtle'];

app.use(async (ctx, next) => {
    
  // parse user from cookie:
    ctx.state.user = UTILS.parse(ctx.cookies.get('user_cookie'));
    await next();
  
});

//加载静态文件
app.use(staticServer(__dirname + '/public'));

console.log(!isProduction);

// add nunjucks as view:
app.use(templating('views', {
    noCache: !isProduction,
    watch: !isProduction
  
}));

router.use('/', index.routes(), index.allowedMethods());

router.use('/admin', admin.routes(), admin.allowedMethods());

router.use('/seeker', seeker.routes(),seeker.allowedMethods());
router.use('/com', com.routes(), com.allowedMethods());

//router.use('/user', users.routes(), users.allowedMethods());
//router.use('/api', api.routes(), api.allowedMethods());

app.use(router.routes(), router.allowedMethods());


//404
app.use(async (ctx) => {
  ctx.status = 404;
  console.log('404'+ctx.request.url);
   await ctx.render('404.html');
})



module.exports = app;
