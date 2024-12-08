"use client";

import React, { useEffect, useState } from "react";
import { AirQualityChart } from "./airquality-chart";
import { generatePromptFromAI } from "@/actions/generateprompfromai";
import { AirQualityData } from "@/types/weather";



export default function AirQuality({ aqi }: { aqi:  AirQualityData | null | undefined}) {
  const [aqiDescription, setAqiDescription] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);


  
  useEffect(() => {
    let isMounted = true; // Track if the component is still mounted

    const fetchAqiDescription = async () => {
      try {
        setLoading(true);
        const responseFromAI = await generatePromptFromAI(aqi?.list[0]?.components);

        if (isMounted) {
          setAqiDescription(responseFromAI as string);
        }
      } catch (error) {
        console.error("Error generating AQI description:", error);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    if (aqi) {
      fetchAqiDescription();
    }

    return () => {
      isMounted = false; // Prevent setting state if the component unmounts
    };
  }, [aqi]);

  console.log("AQI", aqi);

  return !aqi && loading && !aqiDescription ? (
    <div className="h-5 w-5 border-b-2 mt-0 rounded-full animate-spin"></div>
  ) : (
    <div className="flex flex-col md:flex-row gap-2 justify-around w-full lg:w-[80%] items-center">
      <AirQualityChart aqi={aqi?.list[0].main.aqi as number} />
        <p className="text-[12px] md:text-sm text-start text-pretty">{aqiDescription}</p>
    </div>
  );


}
