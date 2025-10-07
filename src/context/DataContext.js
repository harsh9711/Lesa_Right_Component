import { createContext, useState } from "react";

const forecastData = [
  { quarter: "Q1", layer1: 40, layer2: 20, layer3: 10 },
  { quarter: "Q2", layer1: 30, layer2: 25, layer3: 15 },
  { quarter: "Q3", layer1: 35, layer2: 10, layer3: 25 },
];

const donutData = [
  { name: '<1 Yr', value: 400, color: '#FF5C5C' },
  { name: '1–2 Yrs', value: 300, color: '#FFA500' },
  { name: '>2 Yrs', value: 200, color: '#5CD65C' },
];
export const DataContext=createContext()

export default function DataContextProvider({children}){
    const [curIndex,setCurrentInd]=useState(0)
    return(
        <DataContext.Provider value={{forecastData,curIndex,setCurrentInd,donutData}}>
            {children}
        </DataContext.Provider>
    )
}