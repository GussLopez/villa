import dotenv from 'dotenv'

import { Sequelize } from 'sequelize-typescript'

dotenv.config()

export const db = new Sequelize( 'postgresql://test_db_fulx_user:JsrszwUH6JaGeG9nI3Ph6Ef6l5VYI07o@dpg-cuqtnvl6l47c73cikbf0-a.oregon-postgres.render.com/test_db_fulx', {
    models: [__dirname + '/../models/**/*'],
    logging: false,
    dialectOptions: {
        ssl: {
            require: false
        }
    }
})