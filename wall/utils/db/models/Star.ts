import { Table, Column, Model, Max, AutoIncrement, Default, AllowNull, DataType, HasMany } from 'sequelize-typescript'
import { StarComment } from './StarComment';
const moment = require('moment');

@Table
export class Star extends Model<Star> {
  @Column({
    primaryKey: true,
    type: DataType.STRING(128)
  })
  uuid: string


  @Column(DataType.STRING(128))
  openid: string   

  @Column(DataType.STRING(128))
  title: string

  @Column(DataType.STRING(150))
  bgPic: string

  @Default(0)
  @Column
  hot: number
  
  @HasMany(() => StarComment)
  starComment: StarComment[];

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


