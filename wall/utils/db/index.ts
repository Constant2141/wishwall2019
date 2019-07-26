const db = require('./model')
const connect = require('./connect')


connect
    .sync()
    .then(() => {
        console.log('init success')
    })
    .catch(err => {
        console.log(err)
    })


module.exports = {
    db
}