import { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from "uuid";
import Papa from "papaparse";
import fs from "fs";
import dotenv from "dotenv";
import { InferenceClient } from "@huggingface/inference";

dotenv.config();




//save json object with id
const csvStorage: Map<string, any[]> = new Map();

const DashboardController = {

   uploadCsv: async (req: Request, res: Response, next: NextFunction) => {
   try {
      //delete storage
      //csvStorage.clear()
      //get file from multer 
      const file = req.file
      if (!file) {return res.status(400).json({ message: "No file uploaded" })}

      //Read CSV file as string by passing path
      const csvContent = fs.readFileSync(file.path, "utf8");
      //Convert to Json
      const parsedData = Papa.parse(csvContent, 
         { header: true, skipEmptyLines: true, comments: "#", transform: (value) => {
            //replace every . for frontend rechart 
            const normalize = value.replace(/,/g, ".");
            return normalize
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
      const csvObject: { [id: string]: any[] } = {};
      
      for (const [id, data] of csvStorage){
        csvObject[id] = data
      }
      
      console.log("Puffer: ", csvObject)
      
      res.json({ ok: true, data: csvObject });
      console.log("Success! Received CSVfile")

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
  },

  deleteCsv: async (req: Request, res: Response, next: NextFunction) => {
   try {
      csvStorage.clear();

      console.log("CSV deleted")
      res.send("CSV file successfully deleted!")

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
  },

  aiSummary: async (req: Request, res: Response, next: NextFunction) => {
   try {

      const csvObject: { [id: string]: any[] } = {};
      for (const [id, data] of csvStorage){
        csvObject[id] = data
      }

      const csvJSON = JSON.stringify(csvObject, null, 2)

      const prompt = `
         You are a expert Data Scientist. Analyze the CSV data below. Provide EXACTLY 5 bullet points (•) 
         CSV Data:
         ${csvJSON}

         Rules:
         1. Use actual numbers from the data (min, max, mean, range, trends).
         2. Ignore any UUID/ID fields—focus only on numerical data columns.
         3. Each bullet: ONE concise insight (trend, pattern, statistic, or anomaly).
         4. NO introductory text like "Here are 4 bullet points."
         5. NO explanations between bullets.
         6. NO empty bullets.

         Required format:
         • [insight 1]
         • [insight 2]
         • [insight 3]
         • [insight 4]
         • [This insight should be a takeaway: one sentence summary]

         Start now:
      `

      const client = new InferenceClient(process.env.HF_TOKEN);

      const chatCompletion = await client.chatCompletion({
         model: "meta-llama/Llama-3.2-1B-Instruct:novita",
         messages: [
            {
                  role: "system",
                  content: prompt,
            },
         ],
      });

      if (chatCompletion.choices[0]){
         console.log("Answer: ", chatCompletion.choices[0].message);
         res.json(chatCompletion.choices[0].message)
      }
      
     


    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
  },
};

export default DashboardController;
