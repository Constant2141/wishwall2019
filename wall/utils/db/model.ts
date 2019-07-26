module.exports = class Models {
  sequelize: object | any
  Sequelize: object | any

  constructor(){
    let a = require('./connect')
    this.sequelize = new a().sequelize
    this.Sequelize = require('sequelize');
  }
  async init(){
    await this.UserModel();
    await this.WishModel();
    await this.sequelize
        .sync()
        .then(() => {
            console.log('init success')
        })
        .catch(err => {
            console.log(err)
        })
  }

  UserModel(){
    this.sequelize.define('user', {
      id: {
        type: this.Sequelize.INTEGER(11),
        primaryKey: true,            // 主键
        autoIncrement: true,         // 自动递增
      },
      username: this.Sequelize.STRING(100),
      sex: this.Sequelize.STRING(6)
    }, {
        timestamps: false   //关闭自动添加创建时间的功能
      })
  }

  WishModel(){
    this.sequelize.define('wish', {
      id: {
        type: this.Sequelize.INTEGER(11),
        primaryKey: true,            // 主键
        autoIncrement: true,         // 自动递增
      },
      author: this.Sequelize.STRING(100),
    })
  }
}