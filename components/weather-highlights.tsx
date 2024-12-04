'use client';

import { LinearLineChart } from "./feels-like-chart";
import { FaCloudRain } from "react-icons/fa6";
import { BsCloudsFill, BsSunsetFill } from "react-icons/bs";
import { WeatherHighlightData } from "./weather-info";
import { SeaLevelChart } from "./SeaLevelChart";
import { BsSunriseFill } from "react-icons/bs";
import { cn, formatTime } from "@/lib/utils";
import AirQuality from "./airquality-display";
import { RadialChartComponent } from "./HumidityChart";
import { Suspense } from "react";
import { useGetAirQuality } from "@/lib/query";
import LoadingSpinner from "./loadingspinner";

type Precipitation = {
  label: string;
  value: { "1h": number };
};

type Sys = {
  label: string;
  value: { sunrise?: number } | { sunset?: number };
};


const h4Styles = "text-lg sm:text-xl lg:text-2xl font-medium";
const pStyles = "text-sm md:text-md xl:text-lg font-medium";
const containerStyles = `h-[200px] md:h-[240px] backdrop-invert bg-white/10 rounded-xl drop-shadow-xl py-3 px-4 backdrop-opacity-10 sm:col-span-1 w-full max-w-[470px]`



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
           <p className={pStyles}>
              Sea Level: {`${Number(item.value)} hPa`}
          </p>
        </div>
      );
    case 2: //wind speed
      return (
        <div className="flex gap-3 items-center">
          <div className="flex flex-col gap-0 items-start">
            <h4 className={h4Styles}>
              {Number(Array.isArray(item.value) && item.value[0].speed)} m/s
            </h4>
            <p className={pStyles}>
              wind deg:{" "}
              {Number(Array.isArray(item.value) && item.value[1].degrees)}°
            </p>
          </div>
          {/* <LuWind size={48} /> */}
        </div>
      );
    case 3: //Feels like
      return (
        <div className="flex w-full max-w-[320px] justify-center items-center flex-col gap-3">
          <LinearLineChart
            label={item.label}
            value={item.value as WeatherHighlightData["value"]}
          />

          <div className="mt-4  w-full">
            <h4 className={h4Styles}>
              {Number(Array.isArray(item.value) && item.value[0].feels_like)}
              °C
            </h4>
            <p className={pStyles}>
              Real temp:{" "}
              {Number(Array.isArray(item.value) && item.value[1].temp)}°C
            </p>
          </div>
        </div>
      );
    case 4: //Precipitation
      return (
        <div className="flex flex-col items-center gap-3">
          <FaCloudRain size={40} />
          <p className={pStyles}>
            {item.value as number} mm/hr
          </p>
        </div>
      );
    case 5: //Cloudiness
      return (
        <div className="flex flex-col items-center gap-3">
          <BsCloudsFill size={40} />
          <p className={pStyles}>
            {item?.value?.toString()}%
          </p>
        </div>
      );
    case 6: //Sunrise & Sunset
      return (
        <div className="flex flex-col gap-4">
          {/* Sunrise */}
          <div className="flex items-center gap-2">
            <BsSunriseFill size={40} />
            {Array.isArray(item.value) && "sunrise" in item.value[0] && (
              <h4 className={h4Styles}>
                {formatTime((item.value[0] as { sunrise: number }).sunrise)}
              </h4>
            )}
          </div>

          <div className="flex items-center gap-2">
            <BsSunsetFill size={40} />
            {Array.isArray(item.value) && "sunset" in item.value[1] && (
              <h4 className={h4Styles}>
                {formatTime((item.value[1] as { sunset: number }).sunset)}
              </h4>
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
  coords
}: {
  data: WeatherHighlightData[];
  coords: { lat: number; lon: number };
}) {

  const { data: aqi, isLoading } = useGetAirQuality(coords);



  return (
    <Suspense fallback={!data && <p>Loading...</p>}>
     <div className="grid items-start gap-6 grid-cols-2 md:grid-cols-3 w-full justify-center">
      {data.map((item, index) => (
        <div
          key={index}
          className={cn(containerStyles,
            {
              "col-span-full row-start-4 md:col-start-3    md:row-start-3": index === 6,
            }
          )}
        >
          <div className="flex flex-col  h-full gap-1 ">
            <span className="text-md md:text-lg xl:text-xl font-normal">{item.label}</span>

            <div className="flex flex-1 items-center justify-center my-auto">
              {StyledItem(index, item)}
            </div>
          </div>
        </div>
      ))}

     <div className="h-[480px] md:h-[350px] lg:h-[300px] backdrop-invert bg-white/15 rounded-xl drop-shadow-xl px-3 py-2 backdrop-opacity-10 col-start-1 col-span-full md:col-span-2">

        <div className="flex flex-col h-full gap-1">
            <span className="text-md md:text-lg xl:text-xl font-normal">Air Quality</span>

            <div className="flex items-center justify-center my-auto">
               { isLoading ? <LoadingSpinner />: <AirQuality aqi={aqi} />}
            </div>
        </div>
      </div>
      </div>
    </Suspense>
  );
}
