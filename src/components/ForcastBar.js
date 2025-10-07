import { ResponsiveContainer, BarChart, XAxis, YAxis, Bar } from "recharts";

const forecastData = [
  { quarter: "Q1", layer1: 40, layer2: 20, layer3: 10 },
  { quarter: "Q2", layer1: 30, layer2: 25, layer3: 15 },
  { quarter: "Q3", layer1: 35, layer2: 20, layer3: 25 },
];

export default function LeaseForecast() {
  return (
    <ResponsiveContainer width="100%" height={180}>
      <BarChart data={forecastData}>
        <XAxis dataKey="quarter" />
        <YAxis hide />
        
        {/* Multi-layer bars */}
        <Bar dataKey="layer1" stackId="a" fill="#5CD65C" radius={[0, 0, 0, 0]} barSize={40} maxBarSize={10}/>
        <Bar dataKey="layer2" stackId="a" fill="#bd2b20ff" radius={[0,0, 0, 0]} />
        <Bar dataKey="layer3" stackId="a" fill="#bfca23ff" radius={[0, 0, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
