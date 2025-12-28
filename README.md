# BMW CSV Plotter

A **full-stack web application** for uploading, visualizing, and analyzing CSV data with **AI-powered insights**.

---

## ✨ Features

- 📂 Upload and automatically parse CSV files  
- 📊 Interactive charts: **Line**, **Scatter**, **Area**  
- 📄 Export charts as **PDF documents**  
- 🤖 AI-powered data analysis using Hugging Face LLM: meta-llama/Llama-3.2-1B-Instruct:novita 
- ⚡ Real-time data visualization with **Recharts**  
- 📱 Responsive design with **Tailwind CSS**

---

## 🛠 Tech Stack

### Frontend
- React + TypeScript  
- Tailwind CSS 3  
- Recharts for interactive charts  
- html2canvas for screenshots  
- jsPDF for PDF export  
- Vite as the build tool  

### Backend
- Node.js + Express  
- TypeScript  
- Multer for file uploads  
- Papa Parse for CSV parsing  
- Hugging Face Inference API for AI insights  -> meta-llama/Llama-3.2-1B-Instruct:novita
- UUID for file identification  

---

## ⚙️ Installation

### Backend env

NODE_ENV=development
PORT=5001
BACKEND_SERVER_URL=http://localhost:5001
FRONTEND_SERVER_URL=http://localhost:5173
HF_TOKEN=your_huggingface_token


### Frontend env
VITE_BACKEND=http://localhost:5001

📝 How to Use
Click Upload CSV to select a file

Choose a chart type: Line, Scatter, or Area

Click Export as PDF to download your chart

Click AI Analyze for automatic data insights

Click Delete to clear data and start over

🔌 API Endpoints
Method	Endpoint	Description
POST	/api/post-upload-csv	Upload CSV
GET	/api/get-csv-data	Get parsed CSV data
POST	/api/post-delete-csv	Delete CSV data
GET	/api/get-ai-summary	Get AI-generated summary

⚠️ Notes
Data is stored in-memory (resets on server restart)

Requires Tailwind CSS 3 for html2canvas compatibility

AI analysis uses Llama 3.2 via Hugging Face

📷 Screenshot
Add your screenshot in your download folder named by your file!

📄 License
This project is licensed under MIT.


