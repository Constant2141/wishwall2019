import { Table, Column, Model, DataType, ForeignKey, HasMany } from 'sequelize-typescript';
import { TreeHoleComment } from './TreeHoleComment';

@Table({
  timestamps: false
})

export class TreeHole extends Model<TreeHole> {

  @Column({
    primaryKey : true,
    autoIncrement: true,
  })
  id: number
  
  @Column({
    primaryKey: true,
    type: DataType.STRING(190)
  })
  openid: string

  @Column({
    unique: true,
    primaryKey: true,
    type: DataType.STRING(190)
  })
  treeholeId: string

  @Column(DataType.STRING(140))
  text: string

  @Column
  likes: number

  @Column
  sex: number

}