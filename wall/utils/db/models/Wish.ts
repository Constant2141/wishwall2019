import { Table, Column, Model, Max, AutoIncrement, Default, AllowNull, DataType } from 'sequelize-typescript'
const moment = require('moment');

@Table
export class Wish extends Model<Wish> {
  @Column({
    primaryKey: true,
    autoIncrement: true,
  })
  wish_id: number                //每个愿望唯一id

  @Column(DataType.STRING(128))
  openid: string   //发布者openid

  @Column(DataType.STRING(128))
  uuid: string

  @Column(DataType.STRING(170))
  headimgurl: string

  @Column(DataType.STRING(128))
  nickname: string

  // @AllowNull
  @Column(DataType.STRING(128))
  contact: string    //联系方式

  @Column(DataType.STRING(128))
  picker_openid: string //领取者openid

  @Column(DataType.STRING(128))
  wish_content: string

  @Column(DataType.STRING(128))
  wish_type: string

  @Column(DataType.STRING(128))
  wish_where: string

  @Default(0)
  @Column
  wish_status: number  // 0 未被领取， 1 被领取，2 完成

  @Default(0)
  @Column
  wish_many: number

  @Column
  pick_time: Date

  @Column
  finish_time: Date

  @Default(false)  //是否领取了，针对当前用户
  @Column
  gainOrNot: boolean

  @Default(false)  //此愿望是否是匿名发布的
  @Column
  anonymous: boolean


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


