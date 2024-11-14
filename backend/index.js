import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser';
import { config } from 'dotenv';
import { connectMongoDB } from './db/connect.js';
import WorkRouter from './routes/workoutRoutes.js'
import AuthRouter from './routes/authRoutes.js'
import { isLoggedIn } from './middlewares/auth-middleware.js';
const app = express();

config();
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}))
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended:true}))

connectMongoDB(process.env.MONGO_URI)

app.use('/api/workouts', isLoggedIn, WorkRouter);
app.use('/auth', AuthRouter)

const PORT = process.env.PORT || 3001;

app.listen(PORT, ()=>{
  console.log('server started at port: ',PORT);
})