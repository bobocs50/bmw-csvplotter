//Functions for backend Fetching

export async function postUploadCsv(csvFile: File) {
    const formData = new FormData();
    formData.append("file", csvFile);

    const options : RequestInit = {
        method: "POST",
        credentials: "include",
        body: formData,
    }

    try{
        const data = await fetch(`${import.meta.env.VITE_BACKEND}/api/post-upload-csv`, options)
        
        if (data.ok){
            console.log("CSV posted successfully")
            return{ok: true, data}
        } else {
            console.error(`postUploadCsv Bad response ${data.status}`)
        }
    } catch (error){
        console.error(`postUploadCsv: Error occurred ${error}`)
    }
}

export async function getCsvData() {
    const options : RequestInit = {
        method: "GET",
        credentials: "include",
    }

    try{
        const res = await fetch(`${import.meta.env.VITE_BACKEND}/api/get-csv-data`, options)
        
        if (res.ok){
            const data = await res.json()
            return {data: data.data}
        } else {
            console.error(`getCsvData Bad response ${res.status}`)
        }
    } catch (error){
        console.error(`getCsvData: Error occurred ${error}`)
    }
}

export async function postDeleteCsv() {
    const options : RequestInit = {
        method: "POST",
        credentials: "include",
    }

    try{
        const res = await fetch(`${import.meta.env.VITE_BACKEND}/api/post-delete-csv`, options)
        console.log("Response:", res)
        
        if (res.ok){
            console.log("CSV deleted successfully")
            return true
        } else {
            console.error(`postDeleteCsv Bad response ${res.status}`)
            return false
        }
    } catch (error){
        console.error(`postDeleteCsv Error occurred ${error}`)
    }
}

export async function getAiSummary() {
    const options : RequestInit = {
        method: "GET",
        credentials: "include",
    }

    try{
        const res = await fetch(`${import.meta.env.VITE_BACKEND}/api/get-ai-summary`, options)
        
        if (res.ok){
            const data = await res.json()
            return data
        } else {
            console.error(`getAiSummary Bad response ${res.status}`)
        }
    } catch (error){
        console.error(`getAiSummary: Error occurred ${error}`)
    }
}
