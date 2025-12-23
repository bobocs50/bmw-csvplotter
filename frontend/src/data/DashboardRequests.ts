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
        const res = await fetch(`${import.meta.env.VITE_BACKEND}/api/post-upload-csv`, options)
        const data = await res.json()
        
        
        if (res.ok){
            console.log("CSV posted successfully")
            return{ok: true, data}
        } else {
            console.error(`postUploadCsv Bad response ${res.status}`)
        }
    } catch (error){
        console.error(`postUploadCsv: Error occurred ${error}`)
    }
}


export async function getCsvData() {
    const options : RequestInit = {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
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
