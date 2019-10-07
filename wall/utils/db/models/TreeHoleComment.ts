import { Table, Column, DataType, Model, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { TreeHole } from './TreeHole';

@Table({
  timestamps: false
})

export class TreeHoleComment extends Model<TreeHoleComment> {

  @Column({
    primaryKey : true,
    autoIncrement: true,
  })
  id: number
  
  @Column({
    primaryKey: true,
    type: DataType.STRING(190)
  })
  treeholeId: string

  @Column(DataType.STRING(140))
  text: string

  @Column
  sex: number

  @Column(DataType.STRING(128))
  comment: string

  

}