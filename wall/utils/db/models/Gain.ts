import { Table, Column, Model, ForeignKey, DataType } from 'sequelize-typescript'
const moment = require('moment');
@Table
export class Gain extends Model<Gain> {
  @Column({
    primaryKey: true,
    autoIncrement: true,
  })
  id: number

  @Column(DataType.STRING(128))
  openid: string
 
  @Column(DataType.STRING(170))
  headimgurl: string

  @Column(DataType.STRING(128))
  nickname:string


  @Column(DataType.STRING(128))
  uuid:string



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


