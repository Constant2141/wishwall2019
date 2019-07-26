const Models = require('./model')
const Connect = require('./connect')

let connect = new Connect().sequelize

new Models().init()

module.exports = connect