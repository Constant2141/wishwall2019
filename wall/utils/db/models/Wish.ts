import { Table, Column, Model } from 'sequelize-typescript'

@Table
export class Wish extends Model<Wish> {
  @Column({
    primaryKey: true,
    autoIncrement: true,
  })
  id: number

  @Column
  name: string

  @Column
  author: string
}


