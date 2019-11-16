import { Table, Column, DataType, Model, ForeignKey, BelongsTo } from 'sequelize-typescript';

@Table({
  timestamps: false
})

export class TreeHoleLikes extends Model<TreeHoleLikes> {

  @Column({
    primaryKey : true,
    autoIncrement: true,
  })
  id: number
    
  @Column({
    type: DataType.STRING(190)
  })
  openid: string

  @Column({
    primaryKey: true,
    type: DataType.STRING(190)
  })
  treeholeId: string
}