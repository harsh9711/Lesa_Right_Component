import { createContext, useState } from "react";

const forecastData = [
  { quarter: "Q1", layer1: 40, layer2: 20, layer3: 10 },
  { quarter: "Q2", layer1: 30, layer2: 25, layer3: 15 },
  { quarter: "Q3", layer1: 35, layer2: 10, layer3: 25 },
];
export const DataContext=createContext()

export default function DataContextProvider({children}){
    const [curIndex,setCurrentInd]=useState(0)
    return(
        <DataContext.Provider value={{forecastData,curIndex,setCurrentInd}}>
            {children}
        </DataContext.Provider>
    )
}