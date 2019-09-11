import { User } from './models/User'
import { Wish } from './models/Wish'
import { Gain } from './models/Gain'
import { Like } from './models/Like'
const sequelize = require('./connect')



sequelize.addModels([User, Wish,Gain,Like]);
// sequelize.addModels([User]);

sequelize.sync({force:true}).then(res => {
  console.log('init success');

}).catch(err => {
  console.log('init fail' + err);

})



