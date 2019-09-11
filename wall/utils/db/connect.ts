import { Sequelize } from 'sequelize-typescript';
const config = require('./config')
const sequelize = new Sequelize({
  database: config.database,
  dialect: config.dialect,
  define: config.define,
  username: config.username,
  password: config.password,
  pool: config.pool,
  host:config.host
});

sequelize.authenticate()
  .then(async () => {
    console.log('连接成功')
  })
  .catch(err => {
    console.log('连接数据库失败', err)
  })

  module.exports = sequelize