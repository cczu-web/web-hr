/**
 * 开发环境的配置内容
 */

module.exports = {
    env: 'development', //环境名称
 //   env: 'production',
    port: 80,         //服务端口号

    database: 'web_hr',    //数据库地址
    database_username:'root',
    database_password:'123456',
  // database_host: 'ali.vickey.me', // 主机名
    database_host: 'localhost', // 主机名
    database_port: 3306, // 端口号，MySQL默认3306

    redis_url:'',       //redis地址
    redis_port: ''      //redis端口号
    
}