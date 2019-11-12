import { User } from './models/User'
import { Wish } from './models/Wish'
import { Gain } from './models/Gain'
import { TreeHole } from './models/TreeHole'
import { TreeHoleComment } from './models/TreeHoleComment'
import { Star } from './models/Star'
import { Like } from './models/Like'
import { StarComment } from './models/StarComment'
import { Temp } from './models/Temp'
const sequelize = require('./connect')



sequelize.addModels([User,Wish,Gain,TreeHole,TreeHoleComment,Star,StarComment,Like,Temp]);

sequelize.sync({force:false}).then(res => {
  console.log('init success');

}).catch(err => {
  console.log('init fail' + err);

})



