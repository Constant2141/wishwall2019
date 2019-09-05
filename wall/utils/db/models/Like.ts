import { Table, Column, Model, DataType } from 'sequelize-typescript'

@Table
export class Like extends Model<Like> {
  @Column({
    primaryKey: true,
    autoIncrement: true,
  })
  id: number//n

  @Column
  openid: number
 
  @Column
  uuid:number
}


