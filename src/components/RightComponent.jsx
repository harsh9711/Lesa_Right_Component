import { useEffect, useRef, useState } from "react";
import { CornerDownLeft, InfoIcon, Sparkles } from "lucide-react";
import {
  ResponsiveContainer,
  ReferenceArea ,
  PieChart,
  Legend,
  Pie,
  Tooltip,
  Cell,
  BarChart,
  XAxis,
  Bar,
} from "recharts";

import {
  BarIndicator,
  Container,
  DonatCenterTitle,
  DonatCenterValue,
  DonutCenter,
  DonutTitle,
  DonutWrapper,
  ForecastHeading,
  ForecastWrapper,
  Header,
  HighlightBar,
  InfoBox,
  InfoText,
  LegendContainer,
  LegendIcon,
  LegendItem,
  LegendLabel,
  SubHeader,
  TooltipContainer,
  TooltipDot,
  TooltipHeading,
  TooltipNumber,
  TooltipRow,
  TooltipSubtext,
  TooltipValue
} from "../styledcomponents"
import ZoomIcon from "../asset/zoomIcon";

const donutData = [
  { name: "<1 Yr ", value: 1050, color: "#2D7F6B" },
  { name: "> 2 Yrs ", value: 500, color: "#FBAD42" },
  { name: "<1-2 Yrs ", value: 126, color: "#EC6140" },
  
];

const forecastData = [
  { quarter: "Q3 '25", lessThan1Yr: 60, oneToTwoYrs: 50, moreThan2Yrs: 10,total:122 },
  { quarter: "Q4 '25", lessThan1Yr: 60, oneToTwoYrs: 48, moreThan2Yrs: 12,total:122 },
  { quarter: "Q1 '26", lessThan1Yr: 60, oneToTwoYrs: 45, moreThan2Yrs: 15,total:122 },
  { quarter: "Q2 '26", lessThan1Yr: 60, oneToTwoYrs: 40, moreThan2Yrs: 20,total:122 },
  { quarter: "Q3 '26", lessThan1Yr: 60, oneToTwoYrs: 35, moreThan2Yrs: 25,total:122 },
  { quarter: "Q4 '26", lessThan1Yr: 60, oneToTwoYrs: 30, moreThan2Yrs: 30,total:122 },
];

  const CustomBar = ({ fill, x, y, width, height, index, activeIndex }) => {

    // Show custom bar only if this index is active
    if (index !== activeIndex) return null;

    return (
      <g>
        
        <rect
          x={x-42}
          y={y-4}
          width={43}
          height={height+30}
          fill={"#d6d6d641"}
          rx={5}
          ry={7}
          style={{
            filter: "drop-shadow(2px 4px 4px rgba(0,0,0,0.3))",
            borderBottom:"2px solid #1815157c"
          }}
        />
        <line
          x1={x - 38}
          y1={y + height + 30} // bottom of rect
          x2={x - 38 + width + 36}
          y2={y + height + 30}
          stroke="#8887877c"
          strokeWidth={4}
        />
      </g>
    );
  };

export default function RightComponent() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [realCorrdinate,setCorrdinate]=useState({x:0,y:0})
  const chartRef=useRef()
  const renderCustomLegend = ({ payload }) => (
    <LegendContainer>
      <p
        style={{
          width:"100%",
          textAlign:"center",
          fontWeight:'500',
          fontSize:'13px',
          verticalAlign:'bottom',
          fontFamily:'Poppins',
          color: "rgba(51, 51, 51, 1)"

        }}
      >Leases expiring in</p>
      <div 
        style={{
          width:"100%",
          display:'flex',
          justifyContent:'center',
          gap:'16px',
          padding:'0 10px 0 10px'
        }}
      >
          {payload.map((entry, index) => (
          <LegendItem key={`item-${index}`}>
            <LegendIcon style={{ backgroundColor: entry.color }} />
            <LegendLabel>{entry.value}</LegendLabel>
          </LegendItem>
        ))}
      </div>
      
    </LegendContainer>
  );

  //Custom Tooltip
  const CustomTooltip = ({ active, payload,coordinate}) => {
   
    if (active && payload && payload.length) {
    
      const item = payload[0].payload;
      return (
        <TooltipContainer 
          style={{
            transition: "all 0.5s ease-in",
            position:"absolute",
            left:coordinate.x,
            top:coordinate.y
          }}
        >
          <TooltipHeading>National</TooltipHeading>
          <TooltipRow>
            <TooltipDot style={{ backgroundColor: item.color }} />
            <TooltipValue>
              <TooltipNumber>{item.value}</TooltipNumber>/900
            </TooltipValue>
          </TooltipRow>
          <TooltipSubtext>
            Leases expiring in {item.name}
          </TooltipSubtext>
        </TooltipContainer>
      );
    }
    return null;
  };
  
  return (
    <Container>
      <Header>
            <div className="hearder-title">
              <div className="header-area">National</div>
              <div className="market">All Markets</div>
            </div>
            <div className="Header-icon">
              <ZoomIcon/>
            </div>
        </Header>
      <DonutWrapper>
        <ResponsiveContainer width={"100%"} height={250}>
          <PieChart ref={chartRef}>
            <Legend
              verticalAlign="bottom"
              align="center"
              iconType="circle"
              iconSize={10}
              payload={donutData}
              content={renderCustomLegend}
            />
            <Pie
              ref={chartRef}
              data={donutData}
              dataKey="value"
              innerRadius={65}
              outerRadius={85}
              startAngle={90}
              endAngle={-270}
            >
              {donutData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip 
              wrapperStyle={{
              backgroundColor: "#fff",
              opacity: 1,
              borderRadius: "8px",
              zIndex:1000,
              position:"relative"
            }}
            content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>

        <DonutCenter>
          <DonatCenterTitle
          >{forecastData[activeIndex].quarter}</DonatCenterTitle>
          <DonatCenterValue>82,550</DonatCenterValue>
          
          <p
            className="totalSite"
          >Total Sites</p>
        </DonutCenter>
      </DonutWrapper>

      {/* Forecast */}
       <ForecastWrapper>
               <ForecastHeading>Forecast</ForecastHeading>
               <ResponsiveContainer width="100%" height={120}>
                 <BarChart data={forecastData} 
                    margin={{left:20,right:20}}
                    barCategoryGap={12}
                  >
                    <XAxis
                      dataKey="quarter"
                      axisLine={false}
                      tickLine={false}
                      tick={({ x, y, payload }) => (
                        <text
                          x={x-2} 
                          y={y + 10}
                          textAnchor="middle"
                          fill="rgba(30, 30, 31, 1)"
                          fontSize={10}
                          fontWeight={400}
                          fontFamily="Inter"
                        >
                          {payload.value}
                        </text>
                      )}
                    />
                    <Bar
                      dataKey="total"
                      fill="#ffffff63"
                      shape={(props) => <CustomBar {...props} activeIndex={activeIndex} />}
                    />
                    <Bar
                      dataKey="lessThan1Yr"
                      barSize={32}
                      stackId="a"
                      fill="#2D7F6B"
                      radius={[0,0,4,4]}
                      onClick={(data, ind) => setActiveIndex(ind)}
                    />
                    <Bar
                      barSize={32}
                      dataKey="oneToTwoYrs"
                      stackId="a"
                      fill="#FBAD42"
                      onClick={(data, ind) => setActiveIndex(ind)}
                    />
                    <Bar
                      dataKey="moreThan2Yrs"
                      barSize={32}
                      radius={[4,4,0,0]}
                      stackId="a"
                      fill="#EC6140"
                      onClick={(data, ind) => setActiveIndex(ind)}
                    />
                  </BarChart>
               </ResponsiveContainer>
             </ForecastWrapper>        
    </Container>
  );
}

