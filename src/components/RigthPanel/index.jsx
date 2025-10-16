// import { useEffect, useRef, useState } from "react";
// import { CornerDownLeft, InfoIcon, Sparkles } from "lucide-react";
// import {
//   ResponsiveContainer,
//   ReferenceArea ,
//   PieChart,
//   Legend,
//   Pie,
//   Tooltip,
//   Cell,
//   BarChart,
//   XAxis,
//   Bar,
// } from "recharts";

// import {
//   BarIndicator,
//   Container,
//   DonatCenterTitle,
//   DonatCenterValue,
//   DonutCenter,
//   DonutChartBox,
//   DonutTitle,
//   DonutWrapper,
//   ForecastHeading,
//   ForecastWrapper,
//   Header,
//   HighlightBar,
//   InfoBox,
//   InfoText,
//   LegendContainer,
//   LegendIcon,
//   LegendItem,
//   LegendLabel,
//   LegendWrapper,
//   SubHeader,
//   TooltipContainer,
//   TooltipDot,
//   TooltipHeading,
//   TooltipNumber,
//   TooltipRow,
//   TooltipSubtext,
//   TooltipValue,
//   ActiveHighlight,
//   CustomTicket,
//   ChartWrapper,
//   HeaderTitle,
//   HeaderArea,
//   Market,
//   HeaderIcon
// } from "./styled.jsx"
// import ZoomIcon from "../../asset/zoomIcon.jsx";
// import { viewHeightCalculator, viewSizeCalculator } from "./utility.jsx";

// const vhToPx = (vh) => (window.innerHeight * parseFloat(vh.split('v')[0])) / 100;
// // Convert px → vw
// const pxToVw = (px) => (px / window.innerWidth) * 100;

// // Convert vw → px
// const vwToPx = (vw) => (vw * window.innerWidth) / 100;

// const donutData = [
//   { name: "<1 Yr ", value: 1050, color: "#2D7F6B" },
//   { name: "> 2 Yrs ", value: 500, color: "#FBAD42" },
//   { name: "<1-2 Yrs ", value: 126, color: "#EC6140" },
  
// ];
// const customPayload = donutData.map(d => ({
//   value: d.name,
//   color: d.color,
// }));

// const forecastData = [
//   { quarter: "Q3 '25", lessThan1Yr: 60, oneToTwoYrs: 50, moreThan2Yrs: 10,total:122 },
//   { quarter: "Q4 '25", lessThan1Yr: 60, oneToTwoYrs: 48, moreThan2Yrs: 12,total:122 },
//   { quarter: "Q1 '26", lessThan1Yr: 60, oneToTwoYrs: 45, moreThan2Yrs: 15,total:122 },
//   { quarter: "Q2 '26", lessThan1Yr: 60, oneToTwoYrs: 40, moreThan2Yrs: 20,total:122 },
//   { quarter: "Q3 '26", lessThan1Yr: 60, oneToTwoYrs: 35, moreThan2Yrs: 25,total:122 },
//   { quarter: "Q4 '26", lessThan1Yr: 60, oneToTwoYrs: 30, moreThan2Yrs: 30,total:122 },
// ];

// //   const CustomBar = ({ x, y, width, index, activeIndex, payload }) => {
// //   if (index !== activeIndex) return null;

// //   // Calculate total height of the stack
// //   const totalStackHeight =
// //     payload.lessThan1Yr + payload.oneToTwoYrs + payload.moreThan2Yrs;

// //   // Start Y from the top of the first bar
// //   const topY = y - payload.lessThan1Yr; // adjust according to Recharts y

// //   return (
// //     <g>
// //       <rect
// //         x={x - 4} // small horizontal padding for highlight
// //         y={topY - 2} // small vertical padding
// //         width={width + 8} // match bar width + optional padding
// //         height={totalStackHeight + 4} // cover full stack
// //         fill="#d6d6d641"
// //         rx={5}
// //         ry={5}
// //         style={{
// //           filter: "drop-shadow(2px 4px 4px rgba(0,0,0,0.3))",
// //         }}
// //       />
// //     </g>
// //   );
// // };


// export default function RightComponent() {
//   const [activeIndex, setActiveIndex] = useState(0);
//   const [realCorrdinate,setCorrdinate]=useState({x:0,y:0})  
//   const chartRef=useRef()
//   const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
//   const [tooltipDir, setTooltipDir] = useState("right"); 
//   const tooltipRef = useRef(null);

//   useEffect(() => {
//     if (!chartRef.current) return;

//     const containerRect = chartRef.current.getBoundingClientRect();
//     const tooltipRect = tooltipRef.current?.getBoundingClientRect();
//     const tooltipWidth = tooltipRect?.width && tooltipRect.width > 0 ? tooltipRect.width : 180; // ✅ fallback

//     const spaceRight = containerRect.width - mousePos.x;
//     const spaceLeft = mousePos.x;

//     if (spaceRight >= tooltipWidth + 16) {
//       setTooltipDir("right");
//     } else if (spaceLeft >= tooltipWidth + 16) {
//       setTooltipDir("left");
//     } else {
//       setTooltipDir(spaceRight > spaceLeft ? "right" : "left");
//     }
//   }, [mousePos]);


//   // const renderCustomLegend = ({ payload }) => {
//   //   console.log(payload)
//   //   return (
//   //   <LegendContainer>
//   //     <p
//   //       style={{
//   //         width:"100%",
//   //         textAlign:"center",
//   //         fontWeight:'500',
//   //         fontSize:`${viewSizeCalculator(13,true)}`,
//   //         verticalAlign:'bottom',
//   //         fontFamily:'Poppins',
//   //         color: "rgba(51, 51, 51, 1)"

//   //       }}
//   //     >Leases expiring in</p>
//   //     <div 
//   //       style={{
//   //         width:"100%",
//   //         display:'flex',
//   //         justifyContent:'center',
//   //         gap:`${viewSizeCalculator(16,true)}`,
//   //         padding:`0 ${viewSizeCalculator(10,true)} 0 ${viewSizeCalculator(10,true)}`
//   //       }}
//   //     >
//   //         {payload.map((entry, index) => (
//   //         <LegendItem key={`item-${index}`}>
//   //           <LegendIcon style={{ backgroundColor: entry.color }} />
//   //           <LegendLabel>{entry.value}</LegendLabel>
//   //         </LegendItem>
//   //       ))}
//   //     </div>
      
//   //   </LegendContainer>
//   // )};

//   const CustomTooltip = ({ active, payload, mousePos, tooltipDir }) => {
//     if (active && payload && payload.length) {
//       const item = payload[0].payload;

//       const horizontalOffset =
//         tooltipDir === "right" ? "16px" : "-100%";
//       const extraOffset =
//         tooltipDir === "right" ? "" : " translateX(-16px)";

//       return (
//         <TooltipContainer
//           ref={tooltipRef}   // ✅ Attach here
//           style={{
//             position: "fixed", 
//             left: mousePos.x,
//             top: mousePos.y,
//             width: "auto",            
//             maxWidth: "250px",      
//             transform: `translate(${horizontalOffset}, -30%)${extraOffset}`,
//             transition: "top 0.05s ease, left 0.05s ease",
//             pointerEvents: "none",
//             backgroundColor: "#fff",
//             borderRadius: `${viewSizeCalculator(8, true)}`,
//             padding: `${viewSizeCalculator(10, true)} ${viewSizeCalculator(14, true)}`,
//             boxShadow: "0px 2px 10px rgba(0,0,0,0.15)",
//             whiteSpace: "nowrap",       // ✅ Keeps it from breaking mid-word
//           }}
//         >
//           <TooltipHeading>National</TooltipHeading>
//           <TooltipRow>
//             <TooltipDot style={{ backgroundColor: item.color }} />
//             <TooltipValue>
//               <TooltipNumber>{item.value}</TooltipNumber>/900
//             </TooltipValue>
//           </TooltipRow>
//           <TooltipSubtext>Leases expiring in {item.name}</TooltipSubtext>
//         </TooltipContainer>
//       );
//     }
//     return null;
//   };


  
//   return (
//     <Container>
//       <Header>
//        <HeaderTitle>
//         <HeaderArea fontSize={viewSizeCalculator(18, true)}>National</HeaderArea>
//         <Market fontSize={viewSizeCalculator(13, true)}>All Markets</Market>
//       </HeaderTitle>
  
//       <HeaderIcon size={viewSizeCalculator(24, true)}>
//         < ZoomIcon />
//       </HeaderIcon>
//       </Header>
//       <DonutWrapper>
        
//   {/* Chart area (only 200x200) */}
//   <DonutChartBox>
//     <ResponsiveContainer width="100%" height="100%">
//       <PieChart ref={chartRef}>
//               <Pie
//                 data={donutData}
//                 dataKey="value"
//                 innerRadius="75%"
//                 outerRadius="100%"
//                 startAngle={90}
//                 endAngle={-270}
//                 onMouseMove={(data, index, e) => {
//                   setMousePos({
//                     x: e.clientX,
//                     y: e.clientY,
//                   });
//                 }}

//                 onMouseLeave={() => {
//                   setMousePos({ x: 0, y: 0 });
//                 }}
//                 style={{ cursor: "pointer" }}   // 👈 ✋ This line
//               >

//                 {donutData.map((entry, index) => (
//                   <Cell key={`cell-${index}`} fill={entry.color} />
//                 ))}
//               </Pie>


//               <Tooltip
//                 wrapperStyle={{
//                   position: "fixed", // ⬅ This is the key
//                   top: 0,
//                   left: 0,
//                   pointerEvents: "none",
//                   background: "transparent",
//                   border: "none",
//                   boxShadow: "none",
//                   zIndex: 9999, // keep it above everything
//                 }}
//                 content={<CustomTooltip mousePos={mousePos} tooltipDir={tooltipDir} />}
//               />


     
//       </PieChart>
//     </ResponsiveContainer>

//     {/* Center Text */}
//     <DonutCenter>
//       <DonatCenterTitle>{forecastData[activeIndex].quarter}</DonatCenterTitle>
//       <DonatCenterValue>82,550</DonatCenterValue>
//       <p className="totalSite">Total Sites</p>
//     </DonutCenter>
//   </DonutChartBox>

//   {/* Custom Legend below donut */}
//   <LegendWrapper>
//     <p
//       style={{
//         fontWeight: "500",
//         width:"100%",
//         textAlign:"center",
//         fontSize: `${viewSizeCalculator(13,true)}`,
//         color: "rgba(51, 51, 51, 1)",
//       }}
//     >
//       Leases expiring in
//     </p>
//     <div
//       style={{
//         display: "flex",
//         gap: `${viewSizeCalculator(16,true)}`,
//         justifyContent: "center",
//         marginTop: `${viewSizeCalculator(4,true)}`,
//       }}
//     >
//       {donutData.map((d, i) => (
//         <div
//           key={i}
//           style={{
//             display: "flex",
//             alignItems: "center",
//             gap: `${viewSizeCalculator(6,true)}`,
//           }}
//         >
//           <span
//             style={{
//               width: `${viewSizeCalculator(10,true)}`,
//               height: `${viewSizeCalculator(10,true)}`,
//               borderRadius: "50%",
//               backgroundColor: d.color,
//             }}
//           />
//           <span
//             style={{
//               fontSize: `${viewSizeCalculator(12,true)}`,
//               color: "#333",
//               fontFamily: "Poppins",
//             }}
//           >
//             {d.name}
//           </span>
//         </div>
//       ))}
//     </div>
//   </LegendWrapper>
// </DonutWrapper>


//       {/* Forecast */}
//   <ForecastWrapper>
//     <ForecastHeading>Forecast</ForecastHeading>

//     <ChartWrapper>
//         <ResponsiveContainer width="100%" height="100%">
//           <BarChart
//             barGap={"10%"}
//             ref={chartRef}
//             data={forecastData}
//             margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
//           >
//             {/* stacked data bars */}
//           <Bar
//             barSize={"10%"}
//             dataKey="lessThan1Yr" // green
//             stackId="a"
//             fill="#2D7F6B"
//             radius={[0, 0, 4, 4]}
//             onClick={(data, ind) => setActiveIndex(ind)}
//           />
//           <Bar
//             barSize={"10%"}
//             dataKey="oneToTwoYrs" // yellow
//             stackId="a"
//             fill="#FBAD42"
//             onClick={(data, ind) => setActiveIndex(ind)}
//           />
//           <Bar
//             barSize={"10%"}
//             dataKey="moreThan2Yrs" // red
//             stackId="a"
//             fill="#EC6140"
//             radius={[4, 4, 0, 0]}
//             onClick={(data, ind) => setActiveIndex(ind)}
//           />
//           </BarChart>
//         </ResponsiveContainer>
        
        
//         <ActiveHighlight
//             leftPercent={activeIndex * (100 / forecastData.length) + 0.5}
//             widthPercent={(100 / forecastData.length) - 1}
//         >
//             <div />
//         </ActiveHighlight>
//           {forecastData.map((item, index) => (
//             <CustomTicket
//               key={index}
//               leftPercent={(index + 0.5) * (100 / forecastData.length)}
//             >
//               {item.quarter}
//             </CustomTicket>
//           ))}
//     </ChartWrapper>
  
//   </ForecastWrapper>

// </Container>
//   );
// }

import { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { ChevronRight } from 'lucide-react';
import { viewHeightCalculator, viewSizeCalculator } from './utility';

//
// ANIMATIONS
//
const slideIn = keyframes`
  from {
    transform: translateX(${viewSizeCalculator(500, true)});
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

const dropdownExpand = keyframes`
  from {
    max-height: 0;
    opacity: 0;
    transform: translateY(${viewHeightCalculator(-10, true)});
  }
  to {
    max-height: ${viewHeightCalculator(200, true)};
    opacity: 1;
    transform: translateY(0);
  }
`;

//
// PANEL WRAPPER
//
const RightPanelWrapper = styled.div`
  position: absolute;
  top: ${viewHeightCalculator(86, true)};
  right: ${viewSizeCalculator(12, true)};
  width: ${viewSizeCalculator(408, true)};
  height: ${viewHeightCalculator(600, true)};
  background: white;
  border-radius: ${viewSizeCalculator(20, true)};
  box-shadow: 0px ${viewSizeCalculator(1, true)} ${viewSizeCalculator(6, true)} 0px #00000040;
  overflow-y: auto;
  z-index: 10;
  padding: ${viewSizeCalculator(24, true)};
  display: flex;
  flex-direction: column;
  gap: ${viewSizeCalculator(10, true)};
  animation: ${slideIn} 0.45s ease forwards;

  &::-webkit-scrollbar {
    display: none;
  }
  scrollbar-width: none;
  -ms-overflow-style: none;
`;

//
// HEADER
//
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: ${viewSizeCalculator(24, true)};
`;

const HeaderContent = styled.div`
  flex: 1;
`;

const Title = styled.h2`
  font-family: 'Poppins', sans-serif;
  font-size: ${viewSizeCalculator(20, true)};
  font-weight: 500;
  color: #1a1a1a;
  margin: 0 0 ${viewSizeCalculator(4, true)} 0;
`;

const Subtitle = styled.p`
  font-size: ${viewSizeCalculator(14, true)};
  color: #737373;
  margin: 0;
`;

const Actions = styled.div`
  display: flex;
  gap: ${viewSizeCalculator(8, true)};
  align-items: center;
`;

const IconButton = styled.button`
  background: none;
  border: none;
  padding: ${viewSizeCalculator(6, true)};
  cursor: pointer;
  transition: transform 0.2s ease, filter 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: ${viewSizeCalculator(24, true)};
    height: ${viewSizeCalculator(24, true)};
  }

  &:hover {
    transform: scale(1.1);
    filter: brightness(0) saturate(100%) invert(17%) sepia(6%) saturate(9%) hue-rotate(314deg) brightness(96%) contrast(84%);
  }
`;

//
// SITE LIST
//
const SiteList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${viewSizeCalculator(4, true)};
`;

const SiteItem = styled.div`
  position: relative;
  border-radius: ${viewSizeCalculator(12, true)};
  transition: background-color 0.25s, transform 0.25s, box-shadow 0.25s;

  &:hover {
    background-color: #f8f8f8;
    transform: translateY(${viewHeightCalculator(-2, true)});
    box-shadow: 0 ${viewSizeCalculator(4, true)} ${viewSizeCalculator(10, true)} rgba(0,0,0,0.05);
  }

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: ${viewSizeCalculator(8, true)};
    right: 0;
    height: ${viewSizeCalculator(1, true)};
    background-color: #e5e5e5;
    opacity: 0.8;
    transition: opacity 0.2s;
  }

  &:last-child::after {
    content: none;
  }

  &.open::after {
    opacity: 0;
  }
`;

const SiteRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${viewSizeCalculator(16, true)} ${viewSizeCalculator(16, true)} ${viewSizeCalculator(16, true)} ${viewSizeCalculator(8, true)};
  cursor: pointer;
`;

const SiteInfo = styled.div`
  flex: 1;
`;

const SiteName = styled.div`
  font-family: 'Poppins', sans-serif;
  font-size: ${viewSizeCalculator(15, true)};
  font-weight: 500;
  color: #1a1a1a;
  margin-bottom: ${viewSizeCalculator(4, true)};
`;

const SiteLocation = styled.div`
  font-size: ${viewSizeCalculator(13, true)};
  color: #737373;
  display: flex;
  align-items: center;
  gap: ${viewSizeCalculator(4, true)};
`;

const SiteActions = styled.div`
  display: flex;
  align-items: center;
  gap: ${viewSizeCalculator(8, true)};
  position: relative;
`;

const BadgeWrapper = styled.div`
  position: relative;
  width: max-content;
`;

const Badge = styled.span`
  font-family: 'Poppins', sans-serif;
  display: inline-block;
  padding: ${viewSizeCalculator(6, true)} ${viewSizeCalculator(12, true)};
  border-radius: ${viewSizeCalculator(16, true)};
  font-size: ${viewSizeCalculator(12, true)};
  background-color: ${props => (props.variant === 'urgent' ? '#F6DDD8' : '#dcfce7')};
  color: ${props => (props.variant === 'urgent' ? '#EC6140' : '#16a34a')};
  transition: opacity 0.2s;

  ${SiteItem}:hover & {
    opacity: 0;
  }
`;

const TrashIcon = styled.button`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: none;
  border: none;
  cursor: pointer;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.2s;

  ${SiteItem}:hover & {
    opacity: 1;
    pointer-events: auto;
  }

  img {
    width: ${viewSizeCalculator(24, true)};
    height: ${viewSizeCalculator(24, true)};
    filter: brightness(0) saturate(100%) invert(85%) sepia(6%) saturate(9%) hue-rotate(314deg) brightness(96%) contrast(84%);
    transition: filter 0.2s;
  }

  &:hover img {
    filter: brightness(0) saturate(100%) invert(35%) sepia(6%) saturate(9%) hue-rotate(314deg) brightness(96%) contrast(84%);
  }
`;

const ChevronIcon = styled(ChevronRight)`
  color: #d4d4d4;
  width: ${viewSizeCalculator(20, true)};
  height: ${viewSizeCalculator(20, true)};
  transition: transform 0.3s ease, color 0.3s ease;

  &.open {
    transform: rotate(90deg);
    color: #737373;
  }
`;

const Dropdown = styled.div`
  font-family: 'Poppins', sans-serif;
  padding: 0 ${viewSizeCalculator(16, true)} ${viewSizeCalculator(16, true)};
  font-size: ${viewSizeCalculator(14, true)};
  color: #555;
  display: flex;
  flex-direction: column;
  gap: ${viewSizeCalculator(8, true)};
  overflow: hidden;
  animation: ${dropdownExpand} 1s ease forwards;
`;

//
// DATA
//
const sites = [
  { id: '1', name: 'Site 123', location: ['Seattle', 'West', 'Northwest'], status: { text: '183d left', variant: 'urgent' }, hasDelete: true },
  { id: '2', name: 'Site 123', location: ['Seattle', 'West', 'Northwest'], status: { text: '2y left', variant: 'available' }, hasDelete: true },
  { id: '3', name: 'Site 123', location: ['Seattle', 'West', 'Northwest'], status: { text: '183d left', variant: 'urgent' }, hasDelete: true },
  { id: '4', name: 'Site ABCD1234', location: ['Seattle', 'West', 'Northwest'], status: { text: '183d left', variant: 'urgent' }, hasDelete: true },
  { id: '5', name: 'Site 123', location: ['Seattle', 'West', 'Northwest'], status: { text: '183d left', variant: 'urgent' }, hasDelete: true },
];

//
// COMPONENT
//
export const SelectedSites = () => {
  const [openDropdownId, setOpenDropdownId] = useState(null);

  const toggleDropdown = (id) => {
    setOpenDropdownId(prev => (prev === id ? null : id));
  };

  return (
    <RightPanelWrapper>
      <Header>
        <HeaderContent>
          <Title>Selected Sites</Title>
          <Subtitle>View and manage chosen sites</Subtitle>
        </HeaderContent>
        <Actions>
          <IconButton><img src="/wide.png" alt="Copy" /></IconButton>
          <IconButton><img src="/star.png" alt="Star" /></IconButton>
          <IconButton><img src="/stretch.png" alt="Refresh" /></IconButton>
        </Actions>
      </Header>

      <SiteList>
        {sites.map((site) => {
          const isOpen = openDropdownId === site.id;
          return (
            <SiteItem key={site.id} className={isOpen ? 'open' : ''}>
              <SiteRow onClick={() => toggleDropdown(site.id)}>
                <SiteInfo>
                  <SiteName>{site.name}</SiteName>
                  <SiteLocation>{site.location.join(' > ')}</SiteLocation>
                </SiteInfo>

                <SiteActions>
                  {site.status && (
                    <BadgeWrapper>
                      <Badge variant={site.status.variant}>{site.status.text}</Badge>
                      <TrashIcon onClick={(e) => { e.stopPropagation(); console.log(`Delete ${site.id}`); }}>
                        <img src="/trash.png" alt="Delete" />
                      </TrashIcon>
                    </BadgeWrapper>
                  )}
                  <ChevronIcon className={isOpen ? 'open' : ''} />
                </SiteActions>
              </SiteRow>

              {isOpen && (
                <Dropdown>
                  <div>View Details</div>
                  <div>Edit Site</div>
                  <div>Share Link</div>
                </Dropdown>
              )}
            </SiteItem>
          );
        })}
      </SiteList>
    </RightPanelWrapper>
  );
};

