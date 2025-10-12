import styled from "styled-components";
import { viewHeightCalculator, viewSizeCalculator } from "./utility";

export const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  background: #fff;
  border-radius: ${viewSizeCalculator(18,true)};
  box-shadow: 0px 1px 6px 0px rgba(0, 0, 0, 0.25);
  width: ${viewSizeCalculator(408,true)};
  box-sizing: border-box;
  padding: ${viewSizeCalculator(24,true)} ${viewSizeCalculator(24,true)} ${viewSizeCalculator(24,true)} ${viewSizeCalculator(24,true)};
  height:${viewHeightCalculator(680,true)};
  position: absolute;
  right: ${viewSizeCalculator(20,true)};
  font-family: "Inter", "Poppins", "Segoe UI", sans-serif;
`;

export const Header = styled.div`
  width:${viewSizeCalculator(366,true)};
  display:flex;
  margin:0;
  justify-content:space-between;
  font-size:${viewSizeCalculator(20,true)};
  font-weight: 600;
`;

export const SubHeader = styled.div`
  font-size: ${viewSizeCalculator(10,true)};
  text-align: center;
  width: 100%;
`;

export const HeaderTitle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

// "National" text
export const HeaderArea = styled.div`
  font-family: 'Poppins', sans-serif;
  font-weight: 600;
  font-size: ${({ fontSize }) => fontSize || "18px"};
  margin: 0;
`;

// "All Markets" text
export const Market = styled.div`
  color: #707070;
  font-family: 'Poppins', sans-serif;
  font-weight: 400;
  font-size: ${({ fontSize }) => fontSize || "13px"};
  text-align: left;
  width: 100%;
  margin: 0;
`;

// Zoom icon wrapper
export const HeaderIcon = styled.div`
  width: ${({ size }) => size || "24px"};
  height: ${({ size }) => size || "24px"};
  display: flex;
  align-items: center;
  justify-content: center;
`;

// Total Sites text
export const TotalSite = styled.p`
  color: rgba(51, 51, 51, 0.7);
  margin-top: 0;
  font-family: 'Poppins', sans-serif;
  font-weight: 400;
  font-size: 13px;
  line-height: 10px;
  letter-spacing: 0;
  text-align: center;
  vertical-align: bottom;
`;




/* Donut */
export const DonutWrapper = styled.div`
  width: ${viewSizeCalculator(360, true)};
  height: ${viewHeightCalculator(260, true)};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  position: relative;
  padding: 0;
  z-index: 100;
`;
export const DonutChartBox = styled.div`
  width: ${viewSizeCalculator(200, true)};
  height: ${viewHeightCalculator(200, true)};
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const LegendWrapper = styled.div`
  margin-top: ${viewSizeCalculator(8, true)};
  width: ${viewSizeCalculator(360,true)};
  height:${viewHeightCalculator(35,true)};
  display: flex;
  flex-wrap:wrap;
  justify-content: center;
`;
/* Legend */
export const LegendContainer = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap:wrap;
  width: ${viewSizeCalculator(286,true)};
  height:${viewHeightCalculator(36,true)};
  gap:${viewSizeCalculator(16,true)}';
`;
export const LegendItem = styled.div`
  display: flex;
  align-items: center;
  gap:${viewSizeCalculator(6,true)};
`;
export const LegendIcon = styled.span`
  width: ${viewSizeCalculator(10,true)};
  height: ${viewSizeCalculator(10,true)};
  border-radius: 50%;
  display: inline-block;
`;
export const LegendLabel = styled.span`
  font-family: Poppins;
  font-weight: 400;
  font-style: Regular;
  font-size: ${viewSizeCalculator(13,true)};
  leading-trim: CAP_HEIGHT;
  line-height: ${viewSizeCalculator(10,true)};
  letter-spacing: 0%;
  text-align: center;
  vertical-align: bottom;
  color: rgba(51, 51, 51, 0.7);


`;
export const DonutTitle = styled.h3`
  position:absolute;
  bottom:${viewSizeCalculator(30,true)};
  margin: 0;
  font-size:${viewSizeCalculator(12,true)};
  text-align: center;
  font-weight: 200;
  font-size:${viewSizeCalculator(20,true)};
`;

export const DonutCenter = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  pointer-events: none;
  padding-top: 5%;
  z-index:100;

  h4 {
    width: 100%;
    margin: 0;
    font-size: ${viewSizeCalculator(20,true)};
    color: #333;
    font-weight: 600;
  }
  p {
    margin-top:${viewSizeCalculator(4,true)};
    font-size: ${viewSizeCalculator(14,true)};
    color: #777;
  }
`;
export const DonatCenterTitle=styled.h3`
  color: #333333B2;
  font-family: Poppins;
  font-weight: 400;
  font-style: Regular;
  font-size: ${viewSizeCalculator(13,true)};
  leading-trim: CAP_HEIGHT;
  line-height: ${viewSizeCalculator(10,true)};
  letter-spacing: 0%;
  text-align: center;
  vertical-align: bottom;
  margin-bottom:${viewSizeCalculator(4,true)};
`
export const DonatCenterValue=styled.h4`
  font-family: Poppins;
  font-weight: 600;
  font-style: SemiBold;
  font-size: ${viewSizeCalculator(24,true)};
  leading-trim: CAP_HEIGHT;
  line-height: 100%;
  letter-spacing: -2%;
  text-align: center;
  text-transform: uppercase;

`
/* Forecast */
export const ForecastWrapper = styled.div`
  width: ${viewSizeCalculator(366,true)};
  height:${viewHeightCalculator(233,true)};
  padding:${viewSizeCalculator(32,true)} 0 ${viewSizeCalculator(32,true)} 0;
`;
export const ChartWrapper = styled.div`
  width: ${viewSizeCalculator(366, true)};
  height: ${viewHeightCalculator(111, true)};
  position: relative;
  display:flex;
  justify-content:center;
  alignItems:center;
`;
export const ForecastHeading = styled.div`
  text-align: left;
  font-size:${viewSizeCalculator(16,true)};
  width: ${viewSizeCalculator(366,true)};
  font-weight: 600;
  font-family:"Poppins", "Segoe UI", sans-serif;
  margin: ${viewSizeCalculator(32,true)} 0 ${viewSizeCalculator(32,true)} 0;
`;
export const CustomTicket = styled.div`
  position: absolute;
  bottom: -${viewSizeCalculator(14,true)};
  left: ${(props) => props.leftPercent}%;
  transform: translateX(-50%);
  font-family: Inter;
  font-weight: 400;
  color: rgba(30, 30, 31, 1);
  font-size: ${viewSizeCalculator(10,true)};
  text-align: center;
  white-space: nowrap;
`;
export const ActiveHighlight = styled.div`
  position: absolute;
  top: 0;
  left: ${(props) => props.leftPercent+2}%;
  width: ${(props) => props.widthPercent-4}%;
  height: 120%;
  pointer-events: none;
  display: flex;
  justify-content: center;
  align-items: flex-end;

  div {
    width: 100%;
    height: 100%;
    background-color: rgba(199, 197, 197, 0.27);
    border-radius: ${viewSizeCalculator(5, true)};
    box-shadow: 0 0 6px rgba(0,0,0,0.2);
    border-bottom: ${viewSizeCalculator(3,true)} solid rgba(214, 214, 214, 1);
  }
`;
export const HighlightBar = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  padding:0 0px 0 ${viewSizeCalculator(2,true)};
  
`;
export const BarIndicator = styled.div`
  width: ${viewSizeCalculator(40,true)};
  box-shadow: 0 -6px 15px rgba(148, 25, 25, 0.15);
  height: 2px;
  border-radius: 2px;
  background-color: ${(props) => (props.$active ? "#D6D6D6" : "white")};
`;

/* Tooltip */
export const TooltipContainer = styled.div`
  background-color: #fff;
  color: black;
  padding: ${viewSizeCalculator(10,true)};
  border-radius:${viewSizeCalculator(10,true)};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  text-align: center;
  font-size: ${viewSizeCalculator(13,true)};
  z-index: 1000;
`;

export const TooltipHeading = styled.div`
  color: #575555ce;
  font-weight: 700;
  text-align: left;
`;
export const TooltipRow = styled.div`
  display: flex;
  align-items: center;
  gap:${viewSizeCalculator(5,true)};
  width: 100%;
`;
export const TooltipDot = styled.div`
  width: ${viewSizeCalculator(10,true)};
  height: ${viewSizeCalculator(10,true)};
  border-radius: 50%;
`;
export const TooltipValue = styled.p`
  margin: 0;
`;
export const TooltipNumber = styled.span`
  font-weight: 900;
  font-size: ${viewSizeCalculator(20,true)};
`;

export const TooltipSubtext = styled.div`
  color: #575555ce;
  font-weight: 700;
  text-align: left;
`;

/* Info Section */
export const InfoBox = styled.div`

  margin-top: ${viewSizeCalculator(10,true)};
  padding: ${viewSizeCalculator(10,true)};
  width: 100%;
  display: flex;
`;

export const InfoIcon = styled.div`
  text-align: center;
  padding-right:${viewSizeCalculator(10,true)};
  width: 60%;
  height: 100%;
  color: #ec4899;
`;

export const InfoText = styled.div`
  font-size: ${viewSizeCalculator(12,true)};
  margin: 0;

  p {
    margin: 0;
    font-size: ${viewSizeCalculator(11,true)};
    color: #555;
  }
`;