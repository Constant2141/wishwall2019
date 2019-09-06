module.exports = {
    database: '2019wall',
    username: "root",
    password: "123456",
    host: "localhost",
    dialect: "mysql",
    define: {
        charset: 'utf8mb4',
    },
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
}