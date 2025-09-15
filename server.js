import express from 'express';
import cors from 'cors';
import usersRoutes from './routes/usersRoutes.js'
import dotenv from 'dotenv'
dotenv.config()

const PORT = process.env.PORT || 5000

const app = express()

app.use(cors({
  origin: 'http://127.0.0.1:5500',
  credentials: true
}))

app.use(express.json())
app.use("/users", usersRoutes)
app.use(express.urlencoded({ extended: true }))

app.listen(PORT, () => console.log(`server listening on ${PORT}`))