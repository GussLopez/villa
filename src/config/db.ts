import dotenv from 'dotenv'

import { Sequelize } from 'sequelize-typescript'

dotenv.config()

export const db = new Sequelize( 'bd_url', {
    models: [__dirname + '/../models/**/*'],
    logging: false,
    dialectOptions: {
        ssl: {
            require: false
        }
    }
})