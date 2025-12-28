import { postUploadCsv , getCsvData } from '../../data/DashboardRequests';
import { useEffect, useRef, useState } from 'react';
import Chart from './chart/Chart'
import AiSummary from './chart/AiSummary'
import html2canvas from 'html2canvas-pro';
import jsPDF from "jspdf";



export default function App() {
  const [csvData, setCsvData] = useState<any[]>([]);
  const [csvName, setCsvName] = useState<string>("File name not found");
  const [csvSize, setCsvSize] = useState<number>();
  const [csvLastModified, setCsvLastModified] = useState<string>();
  const [csvCount, setCsvCount] = useState<number>(0);  
  const inputRef = useRef<HTMLInputElement>(null);
  const [csvDataDeleted, setCsvDataDeleted] = useState<boolean>(false);
  const [aiRunning, setAiRunning] = useState<boolean>(false);
  const [hasCsv, setHasCsv] = useState<boolean>(false);
  const [pressedExport, setPressedExport] = useState<boolean>(false);
  
  //Upload CSV file to backend
  const handleUploadCsv = async(e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("Upload trigger")

    //get file from input
    const selectedFile = e.target.files?.[0];

    //Set filename
   
    if (selectedFile){
      //Reset old data
      setCsvData([]);
      
      //Format file infos
      const date = new Date(selectedFile.lastModified);
      const formattedDate = date.toLocaleDateString("de-DE", {day: "2-digit", month: "2-digit", year: "2-digit"});
      const sizeInKB = Number((selectedFile.size / 1024).toFixed(2));
     
      //Set file infos
      setCsvName(selectedFile.name);
      setCsvSize(sizeInKB);
      setCsvLastModified(formattedDate)

      //Upload Csv to backend
      await postUploadCsv(selectedFile)
      //get csv from backend
      await handleGetCsv();
  
    } else {
      console.log("File not found or not uploaded")
    }
  }

  const handleGetCsv = async () => {
    //get data
      const data = await getCsvData()
      setCsvData(data?.data)
      console.log("Chart: ", data?.data)
      //Set Counter for CSV 
      setCsvCount(Object.keys(data?.data).length)
      setHasCsv(true)
  }

  //Vibecoded
  const handleExportPdf = async () => {
    const div = document.getElementById("screenshot");
    if (!div) return;

    const canvas = await html2canvas(div, { 
      scale: 2,
      backgroundColor: "#ffffff"
    });

    const imgData = canvas.toDataURL("image/png");

    // Scale to A4
    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save(`CSV-${csvName}-Screenshot.pdf`);
  };

  useEffect(() => {
    if (pressedExport){
      handleExportPdf()
      setPressedExport(false)
    }
  },[pressedExport])



  useEffect(() => {
    console.log("CSV Count: ", csvCount)
  }, [csvCount])
  
  const uploadDisabled = csvCount >= 1;
  
  

  return (
    <div>
      <nav className="flex items-center w-full h-22 bg-white ">
        <div className="">
          <img className="ml-13 mb-1 h-70 w-105" src="/img/LogoBmw.png" alt="Logo"></img>
        </div>
      </nav>
      <div className="h-1 bg-gray-100 w-full"></div>

      
      <div className="flex flex-col items-center">
        <div id="screenshot">
          {/* Main Chart */}
          <Chart setPressedExport={setPressedExport} setHasCsv={setHasCsv} aiRunning={aiRunning} setCsvDataDeleted={setCsvDataDeleted} csvName={csvName} csvSize={csvSize} csvLastModified={csvLastModified} csvData={csvData} setCsvData={setCsvData} setCsvCount={setCsvCount} csvCount={csvCount}></Chart>

          {/* AI Area */}
          <AiSummary hasCsv={hasCsv} setAiRunning={setAiRunning} setCsvDataDeleted={setCsvDataDeleted} csvDataDeleted={csvDataDeleted}></AiSummary>
        </div>
        

        {/* Upload Area */}
        <div onClick={uploadDisabled ? undefined : () => inputRef.current?.click()} className={`flex justify-center items-center mt-5 hover:bg-gray-300 duration-300 hover:scale-105 w-250 h-15 font-bold rounded-2xl border-3 border-gray-200 ${uploadDisabled ? "bg-gray-400" : "bg-gray-100"} `}>
          <h1>Click here to Upload CSV!</h1>
          <input ref={inputRef} type="file" accept=".csv" onChange={handleUploadCsv}  style={{ display: "none" }}></input>
        </div>

      </div>
    </div>
  );
}
