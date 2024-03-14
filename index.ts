import mongoose from 'mongoose'
import express,{Request, Response} from 'express'
import cookieParser from 'cookie-parser'
import router from './routes/userRoutes'
import doteenv from 'dotenv'
import conectDb from './config/db'

conectDb(); 

doteenv.config()

const app = express()

app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.use(cookieParser()) 

app.use('/api',router)

app.listen(3000)