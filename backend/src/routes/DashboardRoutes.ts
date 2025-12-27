import { Router, Request, Response } from 'express';
import DashboardController from '../controller/DashboardController'; 
import multer from "multer";


const router = Router();
//Middleware multer enables file parsing 
const upload = multer({ dest: "uploads/" });

//Routes
router.post('/post-upload-csv', upload.single("file"),  DashboardController.uploadCsv); 
router.get('/get-csv-data', DashboardController.getCsv);
router.post('/post-delete-csv', DashboardController.deleteCsv);


console.log("Dashboard Routes loaded");
export default router; 