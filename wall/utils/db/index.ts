import { User } from './models/User'
import { Wish } from './models/Wish'
const sequelize = require('./connect')



sequelize.addModels([User, Wish]);

sequelize.sync().then(res => {
  console.log('init success');

}).catch(err => {
  console.log('init fail' + err);

})



