import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import dashboardRoutes from './routes/DashboardRoutes';
import multer from "multer";


//Setup
const app = express();



//Middleware
app.use(express.json())
app.use(cors({
    origin: process.env.FRONTEND_SERVER_URL, 
    credentials: true
}));



//Routes
app.use("/api", dashboardRoutes)
console.log("Routes mounted")



app.get('/', (req, res) => {
  res.json({ message: 'Hello from Express + TypeScript!' });
});

export default app;
