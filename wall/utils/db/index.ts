import { User } from './models/User'
import { Wish } from './models/Wish'
import { Gain } from './models/Gain'
import { TreeHole } from './models/TreeHole'
import { TreeHoleComment } from './models/TreeHoleComment'
import { Star } from './models/Star'
import { Like } from './models/Like'
import { StarComment } from './models/StarComment'
const sequelize = require('./connect')



sequelize.addModels([User,Wish,Gain,TreeHole,TreeHoleComment,Star,StarComment,Like]);
// sequelize.addModels([User]);
// sequelize.addModels([User, Wish,Gain,Like]);
// Gain.belongsTo(Wish, { foreignKey: 'uuid', targetKey: 'uuid' })

sequelize.sync({force:false}).then(res => {
  console.log('init success');

}).catch(err => {
  console.log('init fail' + err);

})



