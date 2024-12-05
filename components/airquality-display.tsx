"use client";

import React, { useEffect, useState } from "react";
import { AirQualityChart } from "./airquality-chart";
import { generatePromptFromAI } from "@/actions/generateprompfromai";
import { AirQualityData } from "@/types/weather";



export default function AirQuality({ aqi }: { aqi:  AirQualityData | null | undefined}) {
  const [aqiDescription, setaqiDescription] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);


  useEffect(() => {
     (async () => {
       try {
         const responseFromAI = await generatePromptFromAI(
           aqi?.list[0].components
         );
         console.log("use callback re rendered");
        
         if (loading && responseFromAI === undefined) { 
           setLoading(true);
          }
         setaqiDescription(responseFromAI as string);
        
       } catch (error) {
         console.log(error);
         return;
       }
     })();

     return () => { 
       setLoading(false);
     }
     
  }, [aqi, loading]);

  console.log("AQI", aqi);

  return !aqi ? (
    <div className="h-5 w-5 border-b-2 mt-0 rounded-full animate-spin"></div>
  ) : (
    <div className="flex flex-col md:flex-row gap-2 justify-around w-full lg:w-[80%] items-center">
      <AirQualityChart aqi={aqi?.list[0].main.aqi as number} />
      {loading && !aqiDescription ? (
        <div><span>Loading...</span></div>
      ) : (
        <p className="text-sm text-start text-pretty">{aqiDescription}</p>
      )}
    </div>
  );


}
