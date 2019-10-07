import { Table, Column, DataType, Model, Default} from 'sequelize-typescript';
const moment = require('moment');


@Table
export class StarComment extends Model<StarComment> {
  @Column({
    primaryKey : true,
    autoIncrement: true,
  })
  commentid: number        //用户点赞  

  @Column(DataType.STRING(128))
  uuid: string    //星球的id

  @Column(DataType.STRING(128))
  ccid: string    //评论的id，用于评论的评论

  @Column(DataType.STRING(128))
  openid: string
 
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