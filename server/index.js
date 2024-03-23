import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import './db.js'
import { AdminRouter } from './routes/auth.js';
import { studentRouter } from './routes/student.js'
import { bookRouter } from './routes/book.js'

const app = express()
app.use(express.json())
app.use(cors({              //To remove CORS error.
    origin: ['http://localhost:5173'],
    credentials: true
}))
app.use(cookieParser())
dotenv.config()
app.use('/auth', AdminRouter)
app.use('/student', studentRouter)
app.use('/book', bookRouter)

app.listen(process.env.PORT, () => {
    console.log("Server is running!");
})