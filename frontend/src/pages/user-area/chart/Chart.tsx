import { LineChart, Line, ScatterChart, Scatter, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from 'recharts';
import { useState, useEffect } from 'react';
import Dropdown, { type ChartKind } from './components/Dropdown';
import { postDeleteCsv } from '../../../data/DashboardRequests';

interface Props {
    csvData: any[];
    setCsvData: React.Dispatch<React.SetStateAction<any[]>>;
    csvName: string | undefined;
    csvSize: number | undefined;
    csvLastModified: string | undefined;
    setCsvCount: React.Dispatch<React.SetStateAction<number>>;
    csvCount: number;

}

export default function Chart({ setCsvData, csvData, csvName, csvLastModified, csvSize, setCsvCount, csvCount}: Props) {

    const [chartType, setChartType] = useState<ChartKind>("LineChart");

    useEffect(() => {
        console.log("Charttype: ", chartType)
    },[chartType])


    
    const handleDeleteCsv = async() => {
        const result = await postDeleteCsv()

        if (result){
           setCsvData([])
           const newCsvCount = csvCount - 1;
           setCsvCount(newCsvCount)
           renderChart()

        }
    };


    //Chart is empy -> fallback
     if (csvData.length === 0) {
        return (
            <div className="flex-col mt-30 bg-gray-100 w-250 h-130 rounded-2xl p-5 border-3 border-gray-200">
                <p className="text-xl text-gray-600">No data found...</p>
            </div>
        );
    }

    // Get first CSV values
    const firstCsv = Object.values(csvData)[0]|| [];

    // Get X and Y keys
    const firstrow = firstCsv[0]
    const xKey = Object.keys(firstrow)[0];
    const yKeys = Object.keys(firstrow).slice(1)

    //colors setup
    const colors = ["#3b82f6", "#ef4444", "#10b981", "#f59e0b", "#8b5cf6"];

    //Dynamical render chart
    const renderChart = () => {
        switch (chartType) {
            case "LineChart":
                return(
                    <LineChart data={firstCsv}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey={xKey} />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        {yKeys.map((key, index) => (
                            <Line key={key} type="monotone" dataKey={key} stroke={colors[index % colors.length]} />
                        ))}
                    </LineChart>
                );
            
            case "ScatterChart":
                return (
                    <ScatterChart>
                        <CartesianGrid strokeDasharray="3 3"/>
                        <XAxis type="number" dataKey="x"/>
                        <YAxis type="number" dataKey="y"/>
                        <Tooltip />
                        <Legend />
                        {yKeys.map((key, index) => (
                            <Scatter key={key} name={key} data={firstCsv.map(d => ({ x: d[xKey], y: d[key] }))} fill={colors[index % colors.length]} />
                        ))}
                    </ScatterChart>
                );
            
            case "AreaChart":
                return (
                    <AreaChart data={firstCsv}>
                        <defs>
                            {yKeys.map((key, i) => (
                                <linearGradient id={`color-${i}`} x1="0" y1="0" x2="0" y2="1" key={key}>
                                    <stop offset="5%" stopColor={colors[i % colors.length]} stopOpacity={0.8} />
                                    <stop offset="95%" stopColor={colors[i % colors.length]} stopOpacity={0} />
                                </linearGradient>
                            ))}
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey={xKey} />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        {yKeys.map((key, i) => (
                            <Area
                                key={key}
                                type="monotone"
                                dataKey={key}
                                stroke={colors[i % colors.length]}
                                fill={`url(#color-${i})`}
                            />
                        ))}
                    </AreaChart>
                );
        }
    }


return (
    <div className="flex justify-center mt-30">
        {/* Responsive Chart */}
        <div className="flex-col bg-gray-100 w-250 rounded-2xl p-5 border-3 border-gray-200">
            {/* Chart Name */}
            <div className="flex justify-between p-2">
                <div className="flex flex-col">
                    <h1 className="text-4xl font-bold text-black mb-1">{csvName}</h1>
                    <div className="flex gap-4 font-bold text-black text-sm mb-5 ml-1">
                        <h3>{csvLastModified}</h3>
                        <h3>{csvSize}MB</h3>
                    </div>
                </div>
               
                {/* Dropdown and Delete Button */}
                <div className="flex gap-2">
                    <Dropdown setChartType={setChartType}></Dropdown>
                    <div className="flex justify-center items-center px-3 h-9 bg-red-500 hover:scale-105  hover:bg-red-600 duration-300 rounded-md">
                        <h1 onClick={handleDeleteCsv} className="text-white font-bold">Delete</h1>
                    </div>
                </div>
            </div>
            <div className="w-4xl h-96">
                <ResponsiveContainer key={`${csvName}-${csvData.length}`}>
                {renderChart()}
                </ResponsiveContainer>
            </div>
        </div>
    </div>
    );
}