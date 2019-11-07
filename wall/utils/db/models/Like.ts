import { Table, Column, Model, ForeignKey, DataType, BelongsTo } from 'sequelize-typescript'
const moment = require('moment');
@Table
export class Like extends Model<Like> {
    @Column({
        primaryKey: true,
        autoIncrement: true,
    })
    id: number

    
    @Column({
        type: DataType.STRING(128)
    }) //给哪一条评论点赞
    commentid: string

    @Column(DataType.STRING(128))   //评论的人
    openid: string


    @Column({
        get() {
            return moment(this.getDataValue('createdAt')).format('YYYY-MM-DD HH:mm:ss');
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


