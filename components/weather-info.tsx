'use client';

import { formatDate } from "@/lib/utils";
import { Coord, WeatherData } from "@/types/weather";
import Image from "next/image";
import React, { Suspense,  useState } from "react";
import { FaEye } from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";
import { LuWind } from "react-icons/lu";
import { MdWaterDrop } from "react-icons/md";
import { PiSpeedometerFill } from "react-icons/pi";
import {
  FaTemperatureHalf,
  FaTemperatureArrowDown,
  FaTemperatureArrowUp,
} from "react-icons/fa6";
import WeatherHighlights from "./weather-highlights";
import WeeklyForecast from "./weekly-forecast";
import dynamic from "next/dynamic";


const ClientWeatherMap = dynamic(() => import('@/components/weather-map'), { ssr: false });

export type WeatherHighlightData = {
  label: string;
  value: string | number | Record<string, unknown>[] | undefined;
};

export function WeatherInfo({
  data,
}: {
  data: WeatherData | null;
}): JSX.Element {
  const { visibility, wind, main } = data || {};

  const [weatherHighlights] = useState<WeatherHighlightData[]>([
    { label: "Humidity", value: data?.main.humidity },
    { label: "Sea Level", value: data?.main.sea_level },
    {
      label: "Wind Speed",
      value: [{ speed: data?.wind.speed }, { degrees: data?.wind.deg }],
    },
    {
      label: "Feels like",
      value: [{ feels_like: data?.main.feels_like }, { temp: data?.main.temp }],
    },
    { label: "Precipitation", value: data?.rain?.["1h"] || "No data" },
    { label: "Cloudiness", value: data?.clouds.all },
    {
      label: "Sunrise & Sunset",
      value: [{ sunrise: data?.sys.sunrise }, { sunset: data?.sys.sunset }],
    },
  ]);

  const [storeWeatherInfo] = useState<{ id: number; title: string; icon: React.ReactNode; value: string }[]>([
    {
      id: 1,
      title: "Pressure",
      icon: <PiSpeedometerFill size={18} />,
      value: `${main?.pressure} hPa`,
    },
    {
      id: 2,
      title: "Humidity",
      icon: <MdWaterDrop size={18} />,
      value: `${main?.humidity}%`,
    },
    {
      id: 3,
      title: "Visibility",
      icon: <FaEye size={18} />,
      value: `${visibility} m`,
    },
    {
      id: 4,
      title: "Wind",
      icon: <LuWind size={18} />,
      value: `${wind?.speed} m/s`,
    },
  ]);
  


  const [weatherTemps] = useState<{ id: number; title: string; icon: React.ReactNode; value: string }[]>([{
    id: 1,
    title: "Feels like",
    icon: <FaTemperatureHalf size={20} />,
    value: `${data?.main.feels_like}°C`,
  },
  {
    id: 2,
    title: "Lowest Temp",
    icon: <FaTemperatureArrowDown size={20} />,
    value: `${data?.main.temp_min}°C`,
  },
  {
    id: 3,
    title: "Highest Temp",
    icon: <FaTemperatureArrowUp size={20} />,
    value: `${data?.main.temp_max}°C`,
  },]);



  return (
    <div className="text-white w-full flex flex-col">
      {/**location and date */}
          <div className="flex items-center w-auto h-auto gap-2">
            <IoLocationSharp className="size-5 md:size-7 lg:size-8" color="#D13535" />
            <div className="flex flex-col space-y-0 sm:space-y-1">
              <h2 className="text-md md:text-lg lg:text-[25px] font-medium">
                {data?.name.charAt(0).toUpperCase()}
                {data?.name.slice(1)}
              </h2>
              <p className="font-light text-sm">
                {formatDate(Number(data?.dt))}
              </p>
            </div>
          </div>

          {/**weather description */}
          <div className="mt-2 md:mt-0 relative flex flex-col py-2 gap-[30px] md:gap-[45px] lg:gap-[80px] items-center justify-center">
            <div className="w-full flex flex-col-reverse h-auto">
              <div className="flex -mt-2 flex-1 flex-col items-center justify-center">
                <Image
                  src={`http://openweathermap.org/img/wn/${data?.weather[0].icon}@4x.png`}
                  alt={data?.weather[0].description.toString() || ""}
                  quality={100}
                  height={800}
                  width={100} 
                  className="drop-shadow-lg w-40 md:w-44 lg:w-52"
                />
                <div className="flex -mt-5 flex-col items-center gap-1">
                  <h4 className="text-xl md:text-2xl lg:text-[27px] font-medium">{data?.main.temp}°C</h4>
                  <p className="text-sm md:text-[17px] lg:text-lg font-normal">
                    {data?.weather[0].description.charAt(0).toUpperCase()}
                    {data?.weather[0].description.slice(1)}
                  </p>
                </div>
              </div>

              {/**TEMPERATURES DISPLAYED ON THE RIGHT SIDE */}
            <div className="flex md:flex-col gap-3 md:gap-0 items-center  md:absolute mt-2 justify-center w-auto px-4 md:right-10 lg:right-16 md:w-[270px] top-4 md:top-9">
              {weatherTemps.map((temp) => (
                <div
                  key={temp.id}
                  className="flex gap-2  md:self-start md:space-y-2 justify-center items-center"
                >
                  {temp.icon}
                  <div className="flex flex-col items-center md:items-start">
                  <p className="text-[10px] lg:text-sm font-normal">
                  {temp.title}:{" "}</p>
                  <span className="ms-0 text-sm md:text-lg font-medium">
                      {temp.value.toString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            </div>

            <div className="flex items-center h-auto py-3 justify-center w-full lg:w-[90%]">
              <div className="flex w-full gap-3 justify-around">
                {/**PRESSURE, HUMIDITY, VISIBLITY, WIND */}
                {storeWeatherInfo.filter(Boolean).map((item) => (
                  <div
                    className="flex flex-col gap-1 items-center"
                    key={item.id}
                  >
                    <div className="flex gap-1 items-center">
                      {item.icon}
                      <p className="text-[10px] md:text-lg">{item.title}</p>
                    </div>

                    <p className="text-sm text-center font-medium md:text-md">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/**WEATHER HIGHLIGHTS */}
          <div className="space-y-6 px-3 md:px-6 w-full">
            <h2 className="text-md sm:text-[22px] lg:text-xl font-medium mt-7">Weather Highlights</h2>

           <div className="flex  justify-center flex-wrap w-full items-center">
               <Suspense fallback={<div>{"Loading..."}</div>}>
                   <WeatherHighlights coords={data?.coord as Coord} key={data?.id} data={weatherHighlights}/>
               </Suspense>
            </div>
          </div>

          {/* ONE WEEK WEATHER FORECAST */}
          <div className="space-y-6 mt-12 w-full">
            <h2 className="text-md sm:text-[22px] lg:text-xl font-medium mt-7">Weekly Forecast</h2>

            <WeeklyForecast coord={data?.coord as Coord} />
          </div>

          {/**WEATHER MAP */}
          <div className="space-y-6 mt-12 w-full">
            <h2 className="text-md sm:text-[22px] lg:text-xl font-medium mt-7">Weather Map</h2>
            <ClientWeatherMap
              lat={data?.coord.lat as number}
              lon={data?.coord.lon as number}
            />
          </div>
    </div>
  );
}
