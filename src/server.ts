import express, { json } from 'express'
import morgan from 'morgan';
import cors from 'cors'
import { db } from './config/db';
import { corsCofnig } from './config/cors';
import colors from 'colors'
import invitadosRouter from "./routes/invitadosRouter"
import acompanantesRouter from './routes/acompanantesRouter'

async function connectDB() {
    try {
        await db.authenticate()
        db.sync()
        console.log( colors.blue.bold('Conexión a la BD exitosa') );
    } catch (error) {
        console.log(colors.red.bold('Error al conectar a la BD'));
    }
}
connectDB();

const app = express()

app.use(cors(corsCofnig))
app.use(morgan('dev'))

app.use(express.json())

app.use('/api/invitados', invitadosRouter)
app.use('/api/acompanantes', acompanantesRouter)

export default app