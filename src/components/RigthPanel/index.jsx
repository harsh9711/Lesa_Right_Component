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
  DonutChartBox,
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
  LegendWrapper,
  SubHeader,
  TooltipContainer,
  TooltipDot,
  TooltipHeading,
  TooltipNumber,
  TooltipRow,
  TooltipSubtext,
  TooltipValue,
  ActiveHighlight,
  CustomTicket,
  ChartWrapper,
  HeaderTitle,
  HeaderArea,
  Market,
  HeaderIcon
} from "./styled.jsx"
import ZoomIcon from "../../asset/zoomIcon.jsx";
import { viewHeightCalculator, viewSizeCalculator } from "./utility.jsx";

const vhToPx = (vh) => (window.innerHeight * parseFloat(vh.split('v')[0])) / 100;
// Convert px → vw
const pxToVw = (px) => (px / window.innerWidth) * 100;

// Convert vw → px
const vwToPx = (vw) => (vw * window.innerWidth) / 100;

const donutData = [
  { name: "<1 Yr ", value: 1050, color: "#2D7F6B" },
  { name: "> 2 Yrs ", value: 500, color: "#FBAD42" },
  { name: "<1-2 Yrs ", value: 126, color: "#EC6140" },
  
];
const customPayload = donutData.map(d => ({
  value: d.name,
  color: d.color,
}));

const forecastData = [
  { quarter: "Q3 '25", lessThan1Yr: 60, oneToTwoYrs: 50, moreThan2Yrs: 10,total:122 },
  { quarter: "Q4 '25", lessThan1Yr: 60, oneToTwoYrs: 48, moreThan2Yrs: 12,total:122 },
  { quarter: "Q1 '26", lessThan1Yr: 60, oneToTwoYrs: 45, moreThan2Yrs: 15,total:122 },
  { quarter: "Q2 '26", lessThan1Yr: 60, oneToTwoYrs: 40, moreThan2Yrs: 20,total:122 },
  { quarter: "Q3 '26", lessThan1Yr: 60, oneToTwoYrs: 35, moreThan2Yrs: 25,total:122 },
  { quarter: "Q4 '26", lessThan1Yr: 60, oneToTwoYrs: 30, moreThan2Yrs: 30,total:122 },
];

//   const CustomBar = ({ x, y, width, index, activeIndex, payload }) => {
//   if (index !== activeIndex) return null;

//   // Calculate total height of the stack
//   const totalStackHeight =
//     payload.lessThan1Yr + payload.oneToTwoYrs + payload.moreThan2Yrs;

//   // Start Y from the top of the first bar
//   const topY = y - payload.lessThan1Yr; // adjust according to Recharts y

//   return (
//     <g>
//       <rect
//         x={x - 4} // small horizontal padding for highlight
//         y={topY - 2} // small vertical padding
//         width={width + 8} // match bar width + optional padding
//         height={totalStackHeight + 4} // cover full stack
//         fill="#d6d6d641"
//         rx={5}
//         ry={5}
//         style={{
//           filter: "drop-shadow(2px 4px 4px rgba(0,0,0,0.3))",
//         }}
//       />
//     </g>
//   );
// };


export default function RightComponent() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [realCorrdinate,setCorrdinate]=useState({x:0,y:0})  
  const chartRef=useRef()

  const renderCustomLegend = ({ payload }) => {
    console.log(payload)
    return (
    <LegendContainer>
      <p
        style={{
          width:"100%",
          textAlign:"center",
          fontWeight:'500',
          fontSize:`${viewSizeCalculator(13,true)}`,
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
          gap:`${viewSizeCalculator(16,true)}`,
          padding:`0 ${viewSizeCalculator(10,true)} 0 ${viewSizeCalculator(10,true)}`
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
  )};

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
       <HeaderTitle>
        <HeaderArea fontSize={viewSizeCalculator(18, true)}>National</HeaderArea>
        <Market fontSize={viewSizeCalculator(13, true)}>All Markets</Market>
      </HeaderTitle>
  
      <HeaderIcon size={viewSizeCalculator(24, true)}>
        < ZoomIcon />
      </HeaderIcon>
      </Header>
      <DonutWrapper>
        
  {/* Chart area (only 200x200) */}
  <DonutChartBox>
    <ResponsiveContainer width="100%" height="100%">
      <PieChart ref={chartRef}>
        <Pie
          data={donutData}
          dataKey="value"
          innerRadius="75%"
          outerRadius="100%"
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
            borderRadius: `${viewSizeCalculator(8, true)}`,
            zIndex: 1000,
            position: "relative",
          }}
          content={<CustomTooltip />}
        />
      </PieChart>
    </ResponsiveContainer>

    {/* Center Text */}
    <DonutCenter>
      <DonatCenterTitle>{forecastData[activeIndex].quarter}</DonatCenterTitle>
      <DonatCenterValue>82,550</DonatCenterValue>
      <p className="totalSite">Total Sites</p>
    </DonutCenter>
  </DonutChartBox>

  {/* Custom Legend below donut */}
  <LegendWrapper>
    <p
      style={{
        fontWeight: "500",
        width:"100%",
        textAlign:"center",
        fontSize: `${viewSizeCalculator(13,true)}`,
        color: "rgba(51, 51, 51, 1)",
      }}
    >
      Leases expiring in
    </p>
    <div
      style={{
        display: "flex",
        gap: `${viewSizeCalculator(16,true)}`,
        justifyContent: "center",
        marginTop: `${viewSizeCalculator(4,true)}`,
      }}
    >
      {donutData.map((d, i) => (
        <div
          key={i}
          style={{
            display: "flex",
            alignItems: "center",
            gap: `${viewSizeCalculator(6,true)}`,
          }}
        >
          <span
            style={{
              width: `${viewSizeCalculator(10,true)}`,
              height: `${viewSizeCalculator(10,true)}`,
              borderRadius: "50%",
              backgroundColor: d.color,
            }}
          />
          <span
            style={{
              fontSize: `${viewSizeCalculator(12,true)}`,
              color: "#333",
              fontFamily: "Poppins",
            }}
          >
            {d.name}
          </span>
        </div>
      ))}
    </div>
  </LegendWrapper>
</DonutWrapper>


      {/* Forecast */}
  <ForecastWrapper>
    <ForecastHeading>Forecast</ForecastHeading>

    <ChartWrapper>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            barGap={"10%"}
            ref={chartRef}
            data={forecastData}
            margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
          >
            {/* stacked data bars */}
          <Bar
            barSize={"10%"}
            dataKey="lessThan1Yr" // green
            stackId="a"
            fill="#2D7F6B"
            radius={[0, 0, 4, 4]}
            onClick={(data, ind) => setActiveIndex(ind)}
          />
          <Bar
            barSize={"10%"}
            dataKey="oneToTwoYrs" // yellow
            stackId="a"
            fill="#FBAD42"
            onClick={(data, ind) => setActiveIndex(ind)}
          />
          <Bar
            barSize={"10%"}
            dataKey="moreThan2Yrs" // red
            stackId="a"
            fill="#EC6140"
            radius={[4, 4, 0, 0]}
            onClick={(data, ind) => setActiveIndex(ind)}
          />
          </BarChart>
        </ResponsiveContainer>
        
        
        <ActiveHighlight
            leftPercent={activeIndex * (100 / forecastData.length) + 0.5}
            widthPercent={(100 / forecastData.length) - 1}
        >
            <div />
        </ActiveHighlight>
          {forecastData.map((item, index) => (
            <CustomTicket
              key={index}
              leftPercent={(index + 0.5) * (100 / forecastData.length)}
            >
              {item.quarter}
            </CustomTicket>
          ))}
    </ChartWrapper>
  
  </ForecastWrapper>

</Container>
  );
}

