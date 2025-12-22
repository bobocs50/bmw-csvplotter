import { Router, Request, Response } from 'express';
import DashboardController from '../controller/DashboardController'; // ES module import

const router = Router();

// Routes
router.get('/get-test', DashboardController.getTest);

console.log("Dashboard Routes loaded");

export default router; 