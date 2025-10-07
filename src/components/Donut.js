import { PieChart, Pie, Cell, ResponsiveContainer,Label,Tooltip,Legend} from 'recharts';
import { DataContext } from '../context/DataContext';
import { useContext } from 'react';
import { CustomTooltip } from '../customComponent/customFunction';
import '../styles/LeaseDonut.css'

export default function LeaseDonut() {
  const {forecastData,curIndex,donutData}=useContext(DataContext)
  return (
    <ResponsiveContainer width="100%" height={250}>
      <PieChart>
        <Legend
            verticalAlign="top"
            align="center"
            iconType="circle"
            iconSize={10}
            wrapperStyle={{ fontSize: '13px', marginBottom: '8px' }}
          />
        <Pie
          data={donutData}
          dataKey="value"
          innerRadius={70}
          outerRadius={90}
          paddingAngle={3}
          startAngle={90}
          endAngle={-270}
          legend={true}
        >
          {donutData.map((entry, index) => (
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
