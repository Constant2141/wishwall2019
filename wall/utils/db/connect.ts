module.exports = class Connect {
  sequelize: object | any

  constructor(){
    const Sequelize = require('sequelize');
    const config = require('./config');
    this.sequelize = new Sequelize(config.db, config.username, config.password, {
      host: config.host,
      dialect: config.dialect, 
      pool: config.pool
    })
    this.isConnect();
  }
  isConnect():void {
    this.sequelize
    .authenticate()
    .then(() => {
      console.log('连接成功')
    })
    .catch(err => {
      console.log('连接数据库失败', err)
    })
  }
}

// 连接是否成功

