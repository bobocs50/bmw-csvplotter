import { postUploadCsv , getCsvData } from '../../data/DashboardRequests';
import { useEffect, useState } from 'react';
import Chart from './chart/Chart'




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

  
  return (

    <div className="">

      <nav className="flex items-center w-full h-22 bg-white ">
        <div className="">
          <img className="ml-13 mb-1 h-70 w-105" src="/img/LogoBmw.png" alt="Logo"></img>
        </div>
      </nav>
      <div className="h-1 bg-gray-100 w-full"></div>


      {/* Main Chart */}
      <Chart csvData={csvData} ></Chart>
    </div>
  
  );
}