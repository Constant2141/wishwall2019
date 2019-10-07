import { User } from './models/User'
import { Wish } from './models/Wish'
import { Gain } from './models/Gain'
import { Star } from './models/Star'
import { TreeHole } from './models/TreeHole'
import { TreeHoleComment } from './models/TreeHoleComment'
import { StarComment } from './models/StarComment'
const sequelize = require('./connect')



sequelize.addModels([User, Wish,Gain,Star,TreeHole, TreeHoleComment,StarComment]);
// sequelize.addModels([User]);
// sequelize.addModels([User, Wish,Gain,Like]);

sequelize.sync({force:false}).then(res => {
  console.log('init success');

}).catch(err => {
  console.log('init fail' + err);

})



