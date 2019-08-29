import { Table, Column, Model, Max } from 'sequelize-typescript'

// enum gender{
//     male='男',
//     female='女'
// }

@Table({
  timestamps: false
})
export class User extends Model<User> {

  @Column({
    primaryKey: true,
    autoIncrement: true,
  })
  id: number

  @Column({
    unique: true,
    primaryKey: true
  })
  openid: string
  
  @Column
  sex: number

  @Column
  headimgurl: string

  @Column
  nickname: string

  @Column
  province:string
  
  @Column
  city:string

  @Column
  access_token: string
  
  @Column
  refresh_token: string
}


