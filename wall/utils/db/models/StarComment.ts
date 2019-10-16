import { Table, Column, DataType, Model, Default, ForeignKey, BelongsTo, HasMany} from 'sequelize-typescript';
import { Star } from './Star';
const moment = require('moment');


@Table
export class StarComment extends Model<StarComment> {
  @Column({
    primaryKey : true,
    autoIncrement: true,
  })
  commentid: number        //用户点赞  
  
  @ForeignKey(() => Star)
  @Column(DataType.STRING(128))
  uuid: string    //星球的id

  @ForeignKey(() => StarComment)
  @Column(DataType.INTEGER())
  ccid: number    //原来的评论的id，用于评论的评论

  @Column(DataType.STRING(128))
  ccopenid: string    //原来的评论的发布者的openid

  @Column(DataType.STRING(128))
  openid: string    //评论者的id
 
  @Column(DataType.STRING(170))
  headimgurl: string

  @Column(DataType.STRING(128))
  nickname:string

  @Column(DataType.STRING(128))
  sex: number

  @Column(DataType.STRING(128))
  comment: string
  
  @Default(0)
  @Column
  likes: number


  @Default(0)
  @Column
  many: number

  
  @BelongsTo(() => Star,{as:'fs'})
  star: Star;

  @BelongsTo(() => StarComment,{as:'fc'})
  fatherComment: StarComment;

  @HasMany(() => StarComment)
  starComment: StarComment[];
 
  @Column({
    get() {
      return moment(this.getDataValue('updatedAt')).format('YYYY-MM-DD HH:mm:ss');
    }
  })
  createdAt: Date

  @Column({
    get() {
      return moment(this.getDataValue('updatedAt')).format('YYYY-MM-DD HH:mm:ss');
    }
  })
  updatedAt: Date

}