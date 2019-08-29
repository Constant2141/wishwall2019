module.exports = {
    database: '2019wall',
    username: "root",
    password: "1234567",
    host: "localhost",
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
}