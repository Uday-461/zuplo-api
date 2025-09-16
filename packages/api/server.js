import express from 'express';
import cors from 'cors';
import usersRoutes from './routes/usersRoutes.js'
import dotenv from 'dotenv'
dotenv.config()

const PORT = process.env.PORT || 5000

const app = express()

// Updated CORS to allow Next.js dev server
app.use(cors({
  origin: [
    'http://127.0.0.1:5500',  // Keep for legacy frontend
    'http://localhost:3000',  // Next.js dev server
    'http://127.0.0.1:3000'   // Alternative localhost
  ],
  credentials: true
}))

app.use(express.json())
app.use("/users", usersRoutes)
app.use(express.urlencoded({ extended: true }))

app.listen(PORT, () => console.log(`API server listening on ${PORT}`))