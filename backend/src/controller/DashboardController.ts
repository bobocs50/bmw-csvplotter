import { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from "uuid";
import Papa from "papaparse";
import fs from "fs";

//save json object with id
const csvStorage: Map<string, any[]> = new Map();

const DashboardController = {

   uploadCsv: async (req: Request, res: Response, next: NextFunction) => {
   try {
      //get file from multer 
      const file = req.file
      if (!file) {return res.status(400).json({ message: "No file uploaded" })}

      //Read CSV file as string by passing path
      const csvContent = fs.readFileSync(file.path, "utf8");
      //Convert to Json
      const parsedData = Papa.parse(csvContent, 
         { header: true, skipEmptyLines: true, transform: (value, column) => {
            // Keep 'Referenznummer' as string
            if (column === "Referenznummer") return value;

            // Convert comma decimals to dot and parse as float
            return parseFloat(value.replace(",", "."));
         }});

      //Generate an ID for CSV
      const id = uuidv4();
      //Add to csv Storage
      csvStorage.set(id, parsedData.data)

      //Delete temp file from disk
      fs.unlink(file.path, (err) => { if (err) console.error("Error deleting file:", err)});

      console.log("Success! Uploaded CsvFile:", id)
      res.send("Success! uploadCsv")

   } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
   }
  },


  getCsv: async (req: Request, res: Response, next: NextFunction) => {
   try {
      
      console.log("CSV get triggered")
      


      
      
      
      const csvObject = Object.fromEntries(csvStorage.entries());
      
      console.log(csvObject)
      res.json({ ok: true, data: csvObject });
      console.log("Success! Received CSVfile")

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
  },

};

export default DashboardController;
