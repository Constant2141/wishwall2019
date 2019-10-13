import { Table, Column, Model, ForeignKey, DataType, BelongsTo } from 'sequelize-typescript'
import { Wish } from './Wish';
const moment = require('moment');
@Table
export class Gain extends Model<Gain> {
  @ForeignKey(() => Wish)
  @Column(DataType.STRING(128))
  uuid:string

  @Column(DataType.STRING(128))
  openid: string
 
  @Column(DataType.STRING(170))
  headimgurl: string

  @Column(DataType.STRING(128))
  nickname:string

  @BelongsTo(() => Wish,{as:'w'})
  wish: Wish;

  @Column({
    get() {
      return moment(this.getDataValue('updatedAt')).format('YYYY-MM-DD HH:mm:ss');
    }
  })
  createdAt: Date

  @Column({
    get() {
      return moment(this.getDataValue('updatedAt')).format('YYYY-MM-DD HH:mm:ss');
    }
  })
  updatedAt: Date
}


