const Sequelize2 = require('sequelize')
const config = require('./config')

const sequelize = new Sequelize2(config.db, config.username, config.password, {
    host: config.host,
    dialect: config.dialect, 
    pool: config.pool
  })

// 连接是否成功
sequelize
.authenticate()
.then(() => {
  // console.log('连接成功')
})
.catch(err => {
  // console.log('连接数据库失败', err)
})


module.exports =  sequelize
