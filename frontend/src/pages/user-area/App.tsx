import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from 'recharts';

const data = [
  { Referenznummer: 0, A: -1930.532345, B: -845.3621597, C: 208.6071453 },
  { Referenznummer: 2, A: -2045.69235, B: -1193.897714, C: 227.8168355 },
  { Referenznummer: 4, A: -1698.411607, B: -859.1318746, C: 220.8602661 },
  { Referenznummer: 6, A: -1625.601566, B: -748.7376047, C: 37.18885381 },
  { Referenznummer: 8, A: -1592.497857, B: -1050.354239, C: 83.6166423 },
  { Referenznummer: 10, A: -1611.778497, B: -824.5627784, C: 21.59392277 },
  { Referenznummer: 12, A: -1513.573711, B: -600.1101998, C: 237.5003606 },
  { Referenznummer: 14, A: -1529.743086, B: -533.694026, C: 187.5442983 },
  { Referenznummer: 16, A: -1249.570229, B: -530.4345298, C: 78.76606818 },
  { Referenznummer: 18, A: -1214.625846, B: -650.7088765, C: 125.1661622 },
  { Referenznummer: 20, A: -1191.012004, B: -370.9226115, C: 270.9222844 },
  { Referenznummer: 22, A: -1168.712264, B: -616.1060694, C: 8.016060797 },
  { Referenznummer: 24, A: -1095.989177, B: -571.0192769, C: 247.9532128 },
  { Referenznummer: 26, A: -1035.728353, B: -147.5949551, C: 13.72172953 },
];



// Get the first column as X-axis and the rest as Y-axis dynamically
const headers = Object.keys(data[0]);
const xKey = headers[0];        // First column
const yKeys = headers.slice(1); // All other columns
const colors = ["#3b82f6", "#ef4444", "#10b981", "#f59e0b", "#8b5cf6"]; // Add more if needed


export default function App() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-4">
      <h1 className="text-4xl font-bold text-fuchsia-500 mb-8">
        Bobo is working! ✅
      </h1>
      <div className="w-full max-w-4xl h-96">
        <ResponsiveContainer>
          <LineChart data={data}>
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