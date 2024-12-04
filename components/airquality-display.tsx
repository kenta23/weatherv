"use client";

import React, { useEffect, useState } from "react";
import { AirQualityChart } from "./airquality-chart";
import { generatePromptFromAI } from "@/actions/generateprompfromai";
import { AirQualityData } from "@/types/weather";



export default function AirQuality({ aqi }: { aqi:  AirQualityData | null | undefined}) {
  const [aqiDescription, setaqiDescription] = useState<string>("");


  useEffect(() => {
     (async () => {
       try {
         const responseFromAI = await generatePromptFromAI(
           aqi?.list[0].components
         );
         console.log("use callback re rendered");
         setaqiDescription(responseFromAI as string);
       } catch (error) {
         console.log(error);
         return;
       }
     })();
     
  }, [aqi]);

  console.log("AQI", aqi);

  return (
    !aqi ? (
      <div className="h-5 w-5 border-b-2 border-gray-400 rounded-full animate-spin"></div>
    ) : (
        <div className="flex flex-col md:flex-row gap-4 justify-around w-full lg:w-[80%] items-center">
            <AirQualityChart aqi={aqi?.list[0].main.aqi as number} />
            <p className="text-sm text-center text-pretty">{aqiDescription}</p>
        </div>
    )
  );


}
