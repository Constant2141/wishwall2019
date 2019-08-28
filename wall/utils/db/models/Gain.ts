import { Table, Column, Model } from 'sequelize-typescript'

@Table
export class Gain extends Model<Gain> {
  @Column({
    primaryKey: true,
    autoIncrement: true,
  })
  id: number

  @Column
  openid: string
 
  // @Column
  // headimgurl: string

  @Column
  nickname:string
  
  @Column
  uuid:string
}


