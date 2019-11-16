import { Table, Column, Model, Default, DataType } from 'sequelize-typescript'
const moment = require('moment');

@Table
export class Temp extends Model<Temp> {

    @Column(DataType.STRING(128))
    openid: string   //发布者openid

    @Column({
        primaryKey: true,
        type: DataType.STRING(190)
    })
    uuid: string

    @Column(DataType.STRING(170))
    headimgurl: string

    @Column(DataType.STRING(128))
    nickname: string

    @Column(DataType.STRING(128))
    contact: string    //联系方式


    @Column(DataType.STRING(128))
    wish_content: string

    @Column(DataType.STRING(128))
    wish_type: string

    @Column(DataType.STRING(128))
    wish_where: string

    @Default(0)
    @Column
    wish_status: number  // 0 未被完成， 1  完成

    @Default(0)
    @Column
    wish_many: number

    @Default(false)  //是否领取了，针对当前用户
    @Column
    gainOrNot: boolean

    @Default(false)  //此愿望是否是匿名发布的
    @Column
    anonymous: boolean



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


