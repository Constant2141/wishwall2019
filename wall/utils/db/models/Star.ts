import { Table, Column, Model, Max, AutoIncrement, Default, AllowNull, DataType } from 'sequelize-typescript'
const moment = require('moment');

@Table
export class Star extends Model<Star> {
  @Column({ //应该删掉了
    primaryKey: true,
    autoIncrement: true,
  })
  star_id: number               

  @Column(DataType.STRING(128))
  openid: string   //发布者openid

  @Column(DataType.STRING(128))
  uuid: string

  @Column(DataType.STRING(128))
  title: string

  @Column(DataType.STRING(128))
  content: string

  @Column(DataType.BLOB)
  background: Blob
  

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


