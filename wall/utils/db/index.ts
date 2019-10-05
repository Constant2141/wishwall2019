import { User } from './models/User'
import { Wish } from './models/Wish'
import { Gain } from './models/Gain'
import { Like } from './models/Like'
import { TreeHole } from './models/TreeHole'
import { TreeHoleComment } from './models/TreeHoleComment'

const sequelize = require('./connect')



// sequelize.addModels([User, Wish,Gain,Like]);
sequelize.addModels([User, TreeHole, TreeHoleComment]);

sequelize.sync({force:false}).then(res => {
  console.log('init success');

}).catch(err => {
  console.log('init fail' + err);

})



