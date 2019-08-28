import { User } from './models/User'
import { Wish } from './models/Wish'
const sequelize = require('./connect')


//添加models后需要在这里声明，在上面import
sequelize.addModels([User, Wish]);

sequelize.sync().then(res => {
  console.log('init success');

}).catch(err => {
  console.log('init fail' + err);

})



