import { PieChart, Pie, Cell, ResponsiveContainer,Label } from 'recharts';

const data = [
  { name: 'Expiring <1 Yr', value: 400, color: '#FF5C5C' },
  { name: 'Expiring 1–2 Yrs', value: 300, color: '#FFA500' },
  { name: 'Expiring >2 Yrs', value: 200, color: '#5CD65C' },
];

export default function LeaseDonut() {
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
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
          <Label
            value={` Q3 25\t Total\n${20}`}
            position="center"
            style={{
              textAlign: "center",
              fontSize: "16px",
              fontWeight: "bold",
              whiteSpace: "pre-line",
            }}
          />
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
}
