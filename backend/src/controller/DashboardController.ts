import { Request, Response, NextFunction } from 'express';


const DashboardController = {


   getTest: async (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log("Test works")
        res.json({ message: 'Test route works!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
  },

 

};

export default DashboardController;
