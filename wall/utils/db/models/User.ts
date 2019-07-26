import { Table, Column, Model } from 'sequelize-typescript'

enum gender{
    male='男',
    female='女'
}

@Table
export class User extends Model<User> {

  @Column({
    primaryKey: true,
    autoIncrement: true,
  })
  id: number
  
  
  @Column
  name: string

  @Column
  sex: gender
}


