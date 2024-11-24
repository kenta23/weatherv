"use client";

import { useGetAirQuality } from "@/lib/query";
import React, { Suspense } from "react";
import { AirQualityChart } from "./airquality-chart";



export default function AirQuality() {
  const { data, isLoading } = useGetAirQuality();

  console.log("AQI", data);
  return (
    <Suspense fallback={isLoading && <div>Loading...</div>}>
      <div className="flex flex-row gap-4 justify-around items-center">
        <AirQualityChart aqi={data?.list[0].main.aqi as number} />

        {/* <p className="text-md font-medium">{component}: {component}</p> */}
        <div className="flex w-[190px] text-wrap flex-col gap-2">
          {Object.entries(
            data?.list[0].components as Record<string, number>
          ).map(([key, value]) => (
            <p key={key} className="text-md font-medium">
              {key}: {value}
            </p>
          ))}
        </div>
      </div>
    </Suspense>
  );
}
