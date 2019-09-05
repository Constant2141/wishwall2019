import { Table, Column, Model, Max, AutoIncrement, Default } from 'sequelize-typescript'


@Table
export class Wish extends Model<Wish> {
  @Column({
    primaryKey: true,
    autoIncrement: true,
  })
  wish_id: number                //每个愿望唯一id

  @Column
  openid: string   //发布者openid

  @Column
  uuid: string   //目标对象的唯一标识

  @Column
  headimgurl:string  

  @Column
  nickname:string  //匿名或微信名

  @Column
  picker_openid: string //领取者openid

  @Column
  wish_content: string

  @Column
  wish_type:string

  @Column
  wish_where:string

  @Default(0)
  @Column
  wish_status:number  // 0 未被领取， 1 被领取，2 完成

  @Default(0)
  @Column
  wish_many:number

  @Column
  pick_time:Date

  @Column
  finish_time:Date

  @Default(false)
  @Column
  gainOrNot:boolean

 
}


