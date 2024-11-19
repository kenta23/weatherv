'use client';

import { formatDate } from "@/lib/utils";
import { Coord, WeatherData } from "@/types/weather";
import Image from "next/image";
import React, { Suspense, useEffect, useState } from "react";
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
import { useQuery } from "@tanstack/react-query";
import { getAirQualityIndex } from "@/actions/data";
import WeatherHighlights from "./weather-highlights";
import WeeklyForecast from "./weekly-forecast";
import WeatherMap from "./weather-map";
import { useRouter } from "next/navigation";

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

 
  const storeWeatherInfo = [
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
  ].filter(Boolean);

  const weatherTemps = [
    {
      id: 1,
      title: "Feels like",
      icon: <FaTemperatureHalf size={18} />,
      value: `${data?.main.feels_like}°C`,
    },
    {
      id: 2,
      title: "Lowest Temp",
      icon: <FaTemperatureArrowDown size={18} />,
      value: `${data?.main.temp_min}°C`,
    },
    {
      id: 3,
      title: "Highest Temp",
      icon: <FaTemperatureArrowUp size={18} />,
      value: `${data?.main.temp_max}°C`,
    },
  ];



 

  return (
    <div className="text-white w-full flex flex-col">
      {/**location and date */}

      <div className="flex items-start w-auto h-auto gap-3">
        <IoLocationSharp size={27} color="#D13535" />
        <div className="flex flex-col ">
          <h2 className="text-[25px] font-medium">
            {data?.name.charAt(0).toUpperCase()}
            {data?.name.slice(1)}
          </h2>
          <p className="font-light text-[18px]">
            {formatDate(Number(data?.dt))}
          </p>
        </div>
      </div>

      {/**weather description */}
      <div className="relative  flex flex-col py-2 gap-[80px] items-center justify-center">
        <div className="w-full">
          <div className="flex flex-1 flex-col items-center justify-center">
            <Image
              src={`http://openweathermap.org/img/wn/${data?.weather[0].icon}@4x.png`}
              alt={data?.weather[0].description.toString() || ""}
              quality={100}
              width={200}
              height={800}
              className="drop-shadow-lg"
            />
            <div className="flex -mt-2 flex-col items-center gap-1">
              <p className="text-[40px] font-medium">{data?.main.temp}°C</p>
              <p className="text-[20px] font-normal">
                {data?.weather[0].description.charAt(0).toUpperCase()}
                {data?.weather[0].description.slice(1)}
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center h-[120px] justify-center md:w-full lg:w-[90%]">
          <div className="flex w-full gap-3 justify-around">
            {/**PRESSURE, HUMIDITY, VISIBLITY, WIND */}
            {storeWeatherInfo.map((item) => (
              <div className="flex flex-col gap-2 items-center" key={item.id}>
                <div className="flex gap-1 items-center">
                  {item.icon}
                  <p>{item.title}</p>
                </div>

                <h2>{item.value}</h2>
              </div>
            ))}
          </div>
        </div>

        <div className="absolute px-4 hidden md:block right-0 md:right-3 lg:right-16 w-auto md:w-[300px] top-16">
          {weatherTemps.map((temp) => (
            <div
              key={temp.id}
              className="flex text-start gap-2 mb-3 my-2 justify-start items-center"
            >
              {temp.icon}
              <p className="font-normal">
                {temp.title}:{" "}
                <span className="ms-2 font-medium">
                  {temp.value.toString()}
                </span>
              </p>
            </div>
          ))}
        </div>
      </div>

      {/**WEATHER HIGHLIGHTS */}
      <div className="space-y-6 w-full">
        <h2 className="text-[30px] font-medium mt-7">Weather Highlights</h2>

        <div className="flex justify-center flex-wrap w-full items-center">
          <Suspense fallback={<div>{"Loading..."}</div>}>
            <WeatherHighlights key={data?.id} data={weatherHighlights} />
          </Suspense>
        </div>
      </div>

      {/* ONE WEEK WEATHER FORECAST */}
      <div className="space-y-6 mt-12 w-full">
        <h2 className="text-[30px] font-medium mt-7">This Week Forecast</h2>

        <WeeklyForecast key={data?.id} coord={data?.coord as Coord} />
      </div>

      {/**WEATHER MAP */}
      {/* <div className="space-y-6 mt-12 w-full">
        <h2 className="text-[30px] font-medium mt-7">Weather Map</h2>
        <WeatherMap
          lat={data?.coord.lat as number}
          lon={data?.coord.lon as number}
        />
      </div> */}
    </div>
  );
}
