
const Sequelize = require('sequelize');
const config = require('./config/development');


var sequelize = new Sequelize(config.database, config.database_username, config.database_password, {
    host: config.database_host,
    dialect: 'mysql',
    pool: {
        max: 1000,
        min: 0,
        idle: 6000
    },
    logging:true,
});


//评论表
var pop_comments = sequelize.define('pop_comments',{
    comment_id :{ type: Sequelize.INTEGER(11), primaryKey: true},
    comment_post_id : Sequelize.INTEGER(11),
    comment_author : Sequelize.TEXT('tiny'),
    comment_author_email : Sequelize.STRING(100),
    comment_author_url : Sequelize.STRING(100),
    comment_date : Sequelize.DATE,
    comment_content : Sequelize.STRING(255),
    comment_parent : Sequelize.INTEGER(11),
    comment_approved : Sequelize.TEXT('tiny'),
}, {
        timestamps: false
    }
);

var pop_links = sequelize.define('pop_links',{
    link_id :{ type: Sequelize.INTEGER(11), primaryKey: true},
    link_url :  Sequelize.STRING(100),
    link_name :  Sequelize.STRING(100),
    link_image :  Sequelize.STRING(255),
    link_description :  Sequelize.STRING(255),
    link_visible : Sequelize.TEXT('tiny'),
    link_user_id :  Sequelize.INTEGER(11),
    link_rating :  Sequelize.INTEGER(11),

}, {
        timestamps: false
    }
);

var pop_options =  sequelize.define('pop_options',{
    option_id : {type: Sequelize.INTEGER(11), primaryKey: true},
    option_name : Sequelize.STRING(255),
    option_value : Sequelize.STRING(255),

}, {
        timestamps: false
    }
);

var pop_posts = sequelize.define('pop_posts', {
    post_id: {
        type: Sequelize.INTEGER(11),
        primaryKey: true
    },
    post_user_id: Sequelize.INTEGER,
    post_date : Sequelize.DATE,
    post_title: Sequelize.STRING(255),
    post_content :Sequelize.TEXT('long'),
    post_excerpt : Sequelize.TEXT('long'),
    post_term_id :Sequelize.INTEGER(11),
    post_status : Sequelize.STRING(20),
    post_order : Sequelize.INTEGER(11),
     
}, {
        timestamps: false
    });

var pop_terms = sequelize.define('pop_terms', {
    term_id: {
        type: Sequelize.INTEGER(11),
        primaryKey: true
    },
    term_name: Sequelize.STRING(100),
    term_order : Sequelize.INTEGER(11),
    term_color : Sequelize.STRING(45),
    
}, {
        timestamps: false
    });

 var pop_users = sequelize.define('pop_users', {
    user_id: {
        type: Sequelize.INTEGER(11),
        primaryKey: true
    },
    user_login : Sequelize.STRING(100),
    user_pwd : Sequelize.STRING(100),
    user_nickname :Sequelize.STRING(100),
    user_email : Sequelize.STRING(100),
    user_url : Sequelize.STRING(100),
    user_status : Sequelize.TEXT('tiny'),
    user_role : Sequelize.STRING(255),
 
}, {
        timestamps: false
    });



module.exports = {
    sequelize,
    pop_comments,
    pop_links,
    pop_options,
    pop_posts,
    pop_terms,
    pop_users,

};


