import { useEffect, useState } from 'react';
import { getAiSummary } from '../../../data/DashboardRequests';


interface Props {
    setCsvDataDeleted: React.Dispatch<React.SetStateAction<boolean>>;
    csvDataDeleted: boolean;
    setAiRunning: React.Dispatch<React.SetStateAction<boolean>>;
    hasCsv: boolean;
}


export default function AiSummery ({setCsvDataDeleted, csvDataDeleted, setAiRunning, hasCsv}: Props){

    const [aiSummary, setAiSummary] = useState<string>();
    const [hasAiSummary, setHasAiSummary] = useState<boolean>(false);


    const handleGetAiSummary = async() => {
        setAiRunning(true)
        //ai is loading
        const result = await getAiSummary();
        if (result){
            console.log("AI result: ", result.content)
            setAiSummary(result.content)
            setHasAiSummary(true);
        }
        //ai is done
        setAiRunning(false)

    }
    const handleDeleteAiSummary = () => {
        setAiSummary("");
        setHasAiSummary(false);
        setCsvDataDeleted(false);
        console.log("AI Summary Deleted");
    }

    useEffect(() => {
       handleDeleteAiSummary()
    }, [csvDataDeleted])
    


    return (
        <div>
            {hasAiSummary ? (
                <div className="flex justify-center mt-5 bg-gray-100 w-250 max-h rounded-2xl p-5 border-3 border-gray-200">
                    <pre className="whitespace-pre-wrap text-sm text-gray-800 font-sans leading-relaxed">{aiSummary}</pre>
                </div>
            ) : (
                <div> </div>
            )}
           
            {hasAiSummary ? (
                <div></div>
            ) : (
                <div className="mt-5 group relative inline-flex items-center justify-center">
                    {/* Fancy AI button written by AI */}
                    <span className="absolute inset-0 -z-10 blur-2xl bg-gradient-to-r from-violet-500 via-indigo-500 to-blue-500 opacity-40 group-hover:opacity-70 transition-all duration-500"></span>
                    <button onClick={hasCsv ? handleGetAiSummary : undefined} type="button" className="relative z-10 flex justify-center items-center gap-2 px-6 h-12 w-250 rounded-xl bg-gradient-to-r from-violet-600 via-indigo-600 to-blue-600 text-white font-semibold tracking-wide shadow-lg ring-1 ring-white/10 backdrop-blur-md hover:scale-[1.03] hover:shadow-indigo-500/40 transition-all duration-300">
                        <span className="text-center">AI Analyze</span>
                        <span className="pointer-events-none absolute left-0 top-0 h-full w-12 bg-gradient-to-r from-white/0 via-white/25 to-white/0 translate-x-[-120%] group-hover:translate-x-[220%] transition-transform duration-700 ease-out"></span>
                    </button>
                </div>
            )}
        </div>
    );
} 
