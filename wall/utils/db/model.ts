const con = require('./connect')
const Sequelize = require('sequelize')

const models: any = {}

models.UserModel = con.define('user', {
  id: {
    type: Sequelize.INTEGER(11),
    primaryKey: true,            // 主键
    autoIncrement: true,         // 自动递增
  },
  username: Sequelize.STRING(100),
  sex: Sequelize.STRING(6)
}, {
    timestamps: false   //关闭自动添加创建时间的功能
  })



models.WishModel = con.define('wish', {
  id: {
    type: Sequelize.INTEGER(11),
    primaryKey: true,            // 主键
    autoIncrement: true,         // 自动递增
  },
  author: Sequelize.STRING(100),
})

module.exports = models;