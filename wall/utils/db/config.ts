module.exports = {
    database: '2019wall',
    username: "root",

    // password: "wanna.2141",
    // host: "localhost",  
    password: "123456",
    host: "47.100.12.168",

    // 禁用日志; 默认值: console.log
    logging: false,
    
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },

}