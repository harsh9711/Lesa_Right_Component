import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  background: #fff;
  border-radius: 18px;
  box-shadow: 0px 1px 6px 0px rgba(0, 0, 0, 0.25);
  width: 408px;
  box-sizing: border-box;
  padding: 0 24px 24px 24px;
  height:680px;
  position: absolute;
  right: 20px;
  font-family: "Inter", "Poppins", "Segoe UI", sans-serif;
`;

export const Header = styled.div`
  width:100%;
  display:flex;
  margin:0;
  justify-content:space-between;
  font-size: 20px;
  font-weight: 600;
`;

export const SubHeader = styled.div`
  font-size: 10px;
  text-align: center;
  width: 100%;
`;

/* Legend */
export const LegendContainer = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap:wrap;
  width: 100%;
`;
export const LegendItem = styled.div`
  display: flex;
  align-items: center;
  gap:6px;
`;
export const LegendIcon = styled.span`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  display: inline-block;
`;
export const LegendLabel = styled.span`
  font-family: Poppins;
  font-weight: 400;
  font-style: Regular;
  font-size: 13px;
  leading-trim: CAP_HEIGHT;
  line-height: 10px;
  letter-spacing: 0%;
  text-align: center;
  vertical-align: bottom;
  color: rgba(51, 51, 51, 0.7);


`;

/* Donut */
export const DonutWrapper = styled.div`
  margin-bottom: 0px;
  width: 100%;
  position: relative;
  z-index:100;
`;
export const DonutTitle = styled.h3`
  position:absolute;
  bottom:30px;
  margin: 0;
  font-size: 12px;
  text-align: center;
  font-weight: 200;
  font-size:"20px";
`;

export const DonutCenter = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  position: absolute;
  top: 35%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  pointer-events: none;
  padding-top: 5%;
  z-index:100;

  h4 {
    width: 100%;
    margin: 0;
    font-size: 20px;
    color: #333;
    font-weight: 600;
  }
  p {
    margin-top: 4px;
    font-size: 14px;
    color: #777;
  }
`;
export const DonatCenterTitle=styled.h3`
  color: #333333B2;
  font-family: Poppins;
  font-weight: 400;
  font-style: Regular;
  font-size: 13px;
  leading-trim: CAP_HEIGHT;
  line-height: 10px;
  letter-spacing: 0%;
  text-align: center;
  vertical-align: bottom;
  margin-bottom:4px;
`
export const DonatCenterValue=styled.h4`
  font-family: Poppins;
  font-weight: 600;
  font-style: SemiBold;
  font-size: 24px;
  leading-trim: CAP_HEIGHT;
  line-height: 100%;
  letter-spacing: -2%;
  text-align: center;
  text-transform: uppercase;

`
/* Forecast */
export const ForecastWrapper = styled.div`
  width: 100%;
  padding:32px 0 32px 0;
`;
export const ForecastHeading = styled.div`
  text-align: left;
  width: 100%;
  font-weight: 600;
  font-family:"Poppins", "Segoe UI", sans-serif;
  margin: 0 0 32px 0;
`;
export const HighlightBar = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  padding:0 0px 0 2px;
  
`;
export const BarIndicator = styled.div`
  width: 40px;
  box-shadow: 0 -6px 15px rgba(148, 25, 25, 0.15);
  height: 2px;
  border-radius: 2px;
  background-color: ${(props) => (props.$active ? "#D6D6D6" : "white")};
`;

/* Tooltip */
export const TooltipContainer = styled.div`
  background-color: #fff;
  color: black;
  padding: 10px;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  text-align: center;
  font-size: 13px;
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
  gap: 5px;
  width: 100%;
`;
export const TooltipDot = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
`;
export const TooltipValue = styled.p`
  margin: 0;
`;
export const TooltipNumber = styled.span`
  font-weight: 900;
  font-size: 20px;
`;

export const TooltipSubtext = styled.div`
  color: #575555ce;
  font-weight: 700;
  text-align: left;
`;

/* Info Section */
export const InfoBox = styled.div`

  margin-top: 10px;
  padding: 10px;
  width: 100%;
  display: flex;
`;

export const InfoIcon = styled.div`
  text-align: center;
  padding-right:10px ;
  width: 60%;
  height: 100%;
  color: #ec4899;
`;

export const InfoText = styled.div`
  font-size: 12px;
  margin: 0;

  p {
    margin: 0;
    font-size: 11px;
    color: #555;
  }
`;