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



  
  console.log("The uuid: ", Object.keys(csvData))
  console.log("The conent: ", Object.values(csvData)[0])



 // Wait until we have at least one CSV
const firstCsv = Object.values(csvData)[0] || [];


// If no data yet, avoid crashing
const xKey = firstCsv[0] ? Object.keys(firstCsv[0])[0] : 'Referenznummer';
const yKeys = firstCsv[0] ? Object.keys(firstCsv[0]).slice(1) : ['A', 'B', 'C'];

const colors = ["#3b82f6", "#ef4444", "#10b981", "#f59e0b", "#8b5cf6"]; // Add more if needed




  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-4">
      <h1 className="text-4xl font-bold text-fuchsia-500 mb-8">
        Bobo is working! ✅
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