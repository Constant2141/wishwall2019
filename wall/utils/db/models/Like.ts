import { Table, Column, Model, DataType } from 'sequelize-typescript'
const moment = require('moment');
@Table
export class Like extends Model<Like> {
  @Column({
    primaryKey: true,
    autoIncrement: true,
  })
  id: number//n

  @Column
  openid: number
 
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


