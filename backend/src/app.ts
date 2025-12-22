import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import dashboardRoutes from './routes/DashboardRoutes';
dotenv.config();



const app = express();

//Middleware
app.use(express.json())
app.use(cors());

//Routes
app.use("/api", dashboardRoutes)
console.log("Routes mounted")



app.get('/', (req, res) => {
  res.json({ message: 'Hello from Express + TypeScript!' });
});

export default app;
