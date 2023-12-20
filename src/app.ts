import express, { Request, Response } from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { dataSource } from './config/database'
import router from './routes';

export const app = express()

app.use(cookieParser())
app.use(express.json())
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))

dataSource.initialize();

app.get('/', (req: Request, res: Response): Response => {
    return res.status(200).json({ message: 'Hello World!' })
});

app.use('/update', router);