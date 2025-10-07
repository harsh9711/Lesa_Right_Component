import { useState, useContext } from "react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Cell } from "recharts";
import { DataContext } from "../context/DataContext";
import "../styles/LeaseBarChart.css";

export default function LeaseBarChart() {
  const { forecastData } = useContext(DataContext);
  const [activeIndex, setActiveIndex] = useState(null);

  const handleClick = (data, index) => {
    setActiveIndex(index);
    console.log("Clicked bar:", index, data);
  };

  return (
    <div className="lease-bar-container">
      <ResponsiveContainer width="100%" height={180}>
        <BarChart data={forecastData}>
          <XAxis dataKey="quarter" />
          <YAxis hide />

          {/* Each stacked bar layer */}
          {["layer1", "layer2", "layer3"].map((layer, layerIdx) => (
            <Bar
              key={layer}
              dataKey={layer}
              stackId="a"
              barSize={40}
              onClick={handleClick}
              radius={[0, 0, 0, 0]}
            >
              {forecastData.map((entry, index) => (
                <Cell
                  key={`cell-${layerIdx}-${index}`}
                  className={`lease-bar-cell ${
                    activeIndex === index ? "active-bar" : ""
                  }`}
                  fill={
                    layerIdx === 0
                      ? "#5CD65C"
                      : layerIdx === 1
                      ? "#bd2b20ff"
                      : "#bfca23ff"
                  }
                />
              ))}
            </Bar>
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
