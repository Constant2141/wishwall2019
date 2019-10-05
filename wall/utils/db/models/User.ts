import { Table, Column, Model, Max, Length, DataType } from 'sequelize-typescript'

// enum gender{
//     male='男',
//     female='女'
// }

@Table({
  timestamps: false
})
export class User extends Model<User> {
  @Column({
    unique: true,
    primaryKey: true,
    type: DataType.STRING(190)
  })
  openid: string
  
  @Column
  sex: number

  @Column(DataType.STRING(170))
  headimgurl: string

  @Column(DataType.STRING(128))
  nickname: string

  @Column(DataType.STRING(128))
  province:string
  
  @Column(DataType.STRING(128))
  city:string

  // @Column(DataType.STRING(128))
  // access_token: string
  
  // @Column(DataType.STRING(128))
  // refresh_token: string
}


