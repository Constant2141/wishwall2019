module.exports = {
    database: '2019wall',
    username: "root",
    password: "123456",
    // password: "wanna.2141",
    host: "localhost",
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
}