import { Table, Column, Model, DataType, HasMany, BelongsTo, ForeignKey, Default } from 'sequelize-typescript'
import Acompanante from './Acompanante'

@Table({
    tableName: 'invitados'
})

class Invitado extends Model {
    @Column({
        type: DataType.STRING(100)
    })
    declare nombre: string
    
    @Column({
        type: DataType.STRING(20)
    })
    declare numero: string

    @Column

    @Column({
        type: DataType.INTEGER
    })
    declare acom: number

    @HasMany(() => Acompanante, {
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    })
    declare orders: Acompanante[]

   

}


export default Invitado