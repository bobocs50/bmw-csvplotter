import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from 'recharts';
import { postUploadCsv , getCsvData } from '../../data/DashboardRequests';
import { useEffect, useState } from 'react';






export default function App() {
  const [csvData, setCsvData] = useState<any[]>([]);

  //Upload CSV file to backend
  const uploadCsv = async() => {

    const response = await fetch("/testdata/Testdaten 1.csv");
    if (response.ok){
      const blob = await response.blob();
      const file = new File([blob], "Testdaten 1.csv", { type: "text/csv" });
      console.log("File:", file);
      await postUploadCsv(file)

      //get csv
      await getCsv();
      
    } else {
      console.log("React uploadCsv fail")
    }
  }

  const getCsv = async () => {
    //get data
      const data = await getCsvData()
      setCsvData(data?.data)
      console.log("The datat: ", data)

  }

  useEffect(() => {
    uploadCsv()
  },[])



  
// Get first CSV values
const firstCsv = Object.values(csvData)[0]|| [];

// Get X and Y keys
const firstscv = Object.values(csvData)[0]
const firstrow = firstscv[0]
const xKey = Object.keys(firstrow)[0];
const yKeys = Object.keys(firstrow).slice(1)

//colors setup
const colors = ["#3b82f6", "#ef4444", "#10b981", "#f59e0b", "#8b5cf6"];


  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-4">
      <h1 className="text-4xl font-bold text-black mb-8">
      Graph 1
      </h1>
      <div className="w-full max-w-4xl h-96">
        <ResponsiveContainer>
          <LineChart data={firstCsv}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={xKey} />
            <YAxis />
            <Tooltip />
            <Legend />
            {yKeys.map((key, index) => (
              <Line
                key={key}
                type="monotone"
                dataKey={key}
                stroke={colors[index % colors.length]}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}