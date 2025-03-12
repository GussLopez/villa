import { Table, Column, Model, DataType, HasMany, BelongsTo, ForeignKey, Default } from 'sequelize-typescript'
import Invitado from './Invitados'

@Table({
    tableName: 'acompanante'
})

class Acompanante extends Model {
    @Column({
        type: DataType.STRING(100)
    })
    declare nombre: string
    
    @Column({
        type: DataType.STRING(20)
    })
    declare numero: string

    @ForeignKey(() => Invitado)
    declare invitadoId: number

    @BelongsTo(() => Invitado)
    declare invitado: Invitado
}

export default Acompanante