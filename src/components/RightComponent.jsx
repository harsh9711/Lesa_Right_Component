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
  { name: "<1 Yr", value: 224, color: "#EC6140" },
  { name: "> 2 Yrs", value: 1000, color: "#2D7F6B" },
  { name: "<1-2 Yrs", value: 326, color: "#FBAD42" },
  
];

const forecastData = [
  { quarter: "Q3 '25", lessThan1Yr: 60, oneToTwoYrs: 50, moreThan2Yrs: 10,total:120 },
  { quarter: "Q4 '25", lessThan1Yr: 60, oneToTwoYrs: 48, moreThan2Yrs: 12,total:120 },
  { quarter: "Q1 '26", lessThan1Yr: 60, oneToTwoYrs: 45, moreThan2Yrs: 15,total:120 },
  { quarter: "Q2 '26", lessThan1Yr: 60, oneToTwoYrs: 40, moreThan2Yrs: 20,total:120 },
  { quarter: "Q3 '26", lessThan1Yr: 60, oneToTwoYrs: 35, moreThan2Yrs: 25,total:120 },
  { quarter: "Q4 '26", lessThan1Yr: 60, oneToTwoYrs: 30, moreThan2Yrs: 30,total:120 },
];

  const CustomBar = ({ fill, x, y, width, height, index, activeIndex }) => {

    // Show custom bar only if this index is active
    if (index !== activeIndex) return null;

    return (
      <g>
        
        <rect
          x={x-38}
          y={y}
          width={width + 15}
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
          x2={x - 38 + width + 15}
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
          fontFamily:'Poppins'
        }}
      >Leases expiring in</p>
      <div 
        style={{
          width:"100%",
          display:'flex',
          justifyContent:'center',
          gap:'6px',
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
    useEffect(()=>{  
      const handleMouseMove=(e)=>{
        setCorrdinate({x:e.clientX,y:e.clientY})
      }
      setTimeout(()=>{
        window.addEventListener('mousemove',handleMouseMove)
      },1000)
      
      return ()=>{
        window.removeEventListener('mousemove',handleMouseMove)
      }
    },[])
    if (active && payload && payload.length) {
      const boundryClient=chartRef.current.getBoundingClientRect()
      console.log(realCorrdinate,boundryClient)
      
      const item = payload[0].payload;
      if(realCorrdinate.x<boundryClient.x || realCorrdinate.y<boundryClient.y)return null
      return (
        <TooltipContainer 
          style={{
            transition: "all 0.5s ease-in",
            position:"fixed",
            left:boundryClient.right<realCorrdinate.x+50?boundryClient.left+10:realCorrdinate.x,
            top:realCorrdinate.y+10
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
        <ResponsiveContainer height={250}>
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
                    barCategoryGap={0}
                  >
                    <XAxis
                      dataKey="quarter"
                       padding={{ left: -10, right: -10 }}
                      axisLine={false}
                      tickLine={false}
                      tick={({ x, y, payload }) => (
                        <text
                          x={x-15} 
                          y={y + 10}
                          textAnchor="middle"
                          fill="#333"
                          fontSize={10}
                          fontWeight={500}
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
                      maxBarSize={35}
                      stackId="a"
                      fill="#2D7F6B"
                      onClick={(data, ind) => setActiveIndex(ind)}
                    />
                    <Bar
                      maxBarSize={35}
                      dataKey="oneToTwoYrs"
                      stackId="a"
                      fill="#FBAD42"
                      onClick={(data, ind) => setActiveIndex(ind)}
                    />
                    <Bar
                      dataKey="moreThan2Yrs"
                      maxBarSize={35}
                      radius={[4,4,0,0]}
                      stackId="a"
                      fill="#EC6140"
                      onClick={(data, ind) => setActiveIndex(ind)}
                    />
                  </BarChart>
               </ResponsiveContainer>
       
               {/* <HighlightBar>
                 {forecastData.map((_, index) => (
                   <BarIndicator key={index} $active={activeIndex === index} />
                 ))}
               </HighlightBar> */}
             </ForecastWrapper>        
    </Container>
  );
}

