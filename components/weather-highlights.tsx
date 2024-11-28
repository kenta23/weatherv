'use client';

import { LuWind } from "react-icons/lu";
import { LinearLineChart } from "./LinearLineChart";
import { FaCloudRain } from "react-icons/fa6";
import { BsCloudsFill, BsSunsetFill } from "react-icons/bs";
import { WeatherHighlightData } from "./weather-info";
import { SeaLevelChart } from "./SeaLevelChart";
import { BsSunriseFill } from "react-icons/bs";
import { cn, formatTime } from "@/lib/utils";
import AirQuality from "./airquality-display";
import { RadialChartComponent } from "./HumidityChart";

type Precipitation = {
  label: string;
  value: { "1h": number };
};

type Sys = {
  label: string;
  value: { sunrise?: number } | { sunset?: number };
};


export function StyledItem(
  index: number,
  item: WeatherHighlightData | Precipitation | Sys,
): JSX.Element {
  

  switch (index) {
    case 0: //humidity
      return <RadialChartComponent label={item.label} value={Number(item.value)} />;
    case 1: //sea level
      return (
        <div className="w-full space-y-2 flex flex-col">
          <SeaLevelChart label={item.label} value={Number(item.value)} />
          <h4 className="text-[20px] font-medium">
            Sea Level: {Number(item.value)}{" "}
          </h4>
        </div>
      );
    case 2: //wind speed
      return (
        <div className="flex gap-3 items-center">
          <div className="flex flex-col gap-0 items-start">
            <h4 className="font-medium text-[32px]">
              {Number(Array.isArray(item.value) && item.value[0].speed)} m/s
            </h4>
            <p className="text-[20px] font-light">
              wind deg:{" "}
              {Number(Array.isArray(item.value) && item.value[1].degrees)}°
            </p>
          </div>
          <LuWind size={48} />
        </div>
      );
    case 3: //Feels like
      return (
        <div className="flex flex-col">
          <LinearLineChart
            label={item.label}
            value={item.value as WeatherHighlightData["value"]}
          />

          <div className="mt-4 w-full">
            <h4 className="text-[30px] font-medium">
              {Number(Array.isArray(item.value) && item.value[0].feels_like)}
              °C
            </h4>
            <p className="text-[17px] font-light">
              Real temp:{" "}
              {Number(Array.isArray(item.value) && item.value[1].temp)}°C
            </p>
          </div>
        </div>
      );
    case 4: //Precipitation
      console.log("precipitation", item.value);
      return (
        <div className="flex flex-col items-center gap-2">
          <FaCloudRain size={52} />
          <p className="text-[25px] font-medium">
            {item.value as number} mm/hr
          </p>
        </div>
      );
    case 5: //Cloudiness
      return (
        <div className="flex flex-col items-center gap-2">
          <BsCloudsFill size={52} />
          <p className="text-[30px] font-medium">
            {item?.value?.toString()}%
          </p>
        </div>
      );
    case 6: //Sunrise & Sunset
      return (
        <div className="flex flex-col gap-2">
          {/* Sunrise */}
          <div className="flex items-center gap-2">
            <BsSunriseFill size={32} />
            {Array.isArray(item.value) && "sunrise" in item.value[0] && (
              <p className="text-[25px]">
                {formatTime((item.value[0] as { sunrise: number }).sunrise)}
              </p>
            )}
          </div>

          <div className="flex items-center gap-2">
            <BsSunsetFill size={32} />
            {Array.isArray(item.value) && "sunset" in item.value[1] && (
              <p className="text-[25px]">
                {formatTime((item.value[1] as { sunset: number }).sunset)}
              </p>
            )}
          </div>
        </div>
      );
    //  case 7 : //Air Quality
    //     return <AirQuality />
    default:
      return <p>Not yet updated</p>;
  }
}

export default function WeatherHighlights({
  data,
}: {
  data: WeatherHighlightData[];
}) {

  return (
    <div className="grid items-center gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3  w-full justify-center">
      {data.map((item, index) => (
        <div
          key={index}
          className={cn(
            `h-[240px] backdrop-invert bg-white/15 rounded-xl drop-shadow-xl px-3 py-2 backdrop-opacity-10 col-span-full sm:col-span-1 w-full`,
            {
              "col-start-1 col-span-full row-start-4 md:col-start-3 md:row-start-3": index === 6,
            }
          )}
        >
          <div className="flex flex-col h-full gap-1 ">
            <span className="text-xl font-normal">{item.label}</span>

            <div className="flex items-center justify-center my-auto">
              {StyledItem(index, item)}
            </div>
          </div>
        </div>
      ))}

     <div className="h-[300px] backdrop-invert bg-white/15 rounded-xl drop-shadow-xl px-3 py-2 backdrop-opacity-10  col-start-1 col-span-full md:col-span-2 ">
       <div className="flex flex-col h-full gap-1 ">
            <span className="text-xl font-normal">Air Quality</span>

            <div className="flex items-center justify-center my-auto">
              <AirQuality />
            </div>
          </div>
      </div>
    </div>
  );
}
