import { Table, Column, Model } from 'sequelize-typescript'

@Table
export class Wish extends Model<Wish> {
  @Column({
    primaryKey: true,
    autoIncrement: true,
  })
  id: number

  @Column
  event: string

  @Column
  author: string

  @Column
  thumbsUp:number
}


