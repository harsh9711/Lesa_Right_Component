import { PieChart, Pie, Cell, ResponsiveContainer,Label,Tooltip} from 'recharts';
import { DataContext } from '../context/DataContext';
import { useContext } from 'react';

const data = [
  { name: 'Expiring <1 Yr', value: 400, color: '#FF5C5C' },
  { name: 'Expiring 1–2 Yrs', value: 300, color: '#FFA500' },
  { name: 'Expiring >2 Yrs', value: 200, color: '#5CD65C' },
];

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const item = payload[0].payload;
    return (
      <div
        style={{
          background: "rgba(0,0,0,0.8)",
          color: "#fff",
          padding: "8px 12px",
          borderRadius: "10px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
          textAlign: "center",
          fontSize: "13px",
        }}
      >
        <div style={{ 
          fontWeight: "bold", 
          color: item.color,
          width:"10px",
          height:"10px",
          borderRadius:"50%",
          backgroundColor:item.color
          }}>
          
        </div>
        <span 
          style={{
            fontSize:"20px"
          }}
        >{item.value}/900</span>
        <div>leases {item.name}</div>
      </div>
    );
  }
  return null;
};
export default function LeaseDonut() {
  const {forecastData,curIndex}=useContext(DataContext)
  return (
    <ResponsiveContainer width="100%" height={250}>
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          innerRadius={70}
          outerRadius={90}
          paddingAngle={3}
          startAngle={90}
          endAngle={-270}
          legend={true}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color}
              lable={true} 
            />
          ))}
          <Label
            value={` ${forecastData[curIndex].quarter} ${"\n"} ${forecastData[curIndex].layer1}`}
            position="center"
            style={{
              textAlign: "center",
              fontSize: "16px",
              fontWeight: "bold",
              whiteSpace: "pre-line",
            }}
          />
          <Tooltip content={<CustomTooltip />} />
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
}
