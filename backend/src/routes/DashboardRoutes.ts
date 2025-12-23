import { Router, Request, Response } from 'express';
import DashboardController from '../controller/DashboardController'; 
import multer from "multer";


const router = Router();
//Middleware multer enables file parsing 
const upload = multer({ dest: "uploads/" });

//Routes

//Post upload CSV data from frontend -> turn into object
router.post('/post-upload-csv', upload.single("file"),  DashboardController.uploadCsv); 

//Get CSV files to frontend
router.get('/get-csv-data', DashboardController.getCsv);

//Post Delete with id
//router.post('/get-data', DashboardController.postDeleteCsv);



console.log("Dashboard Routes loaded");
export default router; 