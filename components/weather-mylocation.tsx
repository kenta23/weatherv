"use client";

import { WeatherData } from "@/types/weather";
import { Suspense, useState } from "react";
import { useWeatherBackground } from "@/app/store/store";
import { cn, formatDate } from "@/lib/utils";
import SearchInput from "./search-input";
import { IoLocationSharp } from "react-icons/io5";
import { useQuery } from "@tanstack/react-query";
import { getMyWeatherData } from "@/actions/data";
import Image from "next/image";

export default function MyWeatherInfo() {
  const [otherWeatherInfo, setOtherWeatherInfo] = useState<WeatherData>();
  const { data: weatherData, isLoading } = useQuery({
    queryKey: ["weatherData"],
    queryFn: async () => {
      const mylocation = await fetch("https://ipwho.is/")
        .then((res) => res.json())
        .then((data) => data);

      const { latitude, longitude } = await mylocation;

      const data = await getMyWeatherData({
        lat: latitude.toString(),
        lon: longitude.toString(),
      });

      if (data) {
        try {
          if (data?.weather[0].icon.lastIndexOf("n") !== -1) {
            setBackground(
              data?.weather[0]?.description.toString() || "",
              "night"
            );
          } else {
            setBackground(
              data?.weather[0]?.description.toString() || "",
              "day"
            );
          }
        } catch (error) {
          console.log(error);
        }
      }
      return data;
    },
  });

  const { setBackground } = useWeatherBackground();

  console.log("DATA FROM CLIENT", weatherData);
  console.log("loading", isLoading);

  return (
    <Suspense fallback={isLoading && <p>Loading</p>}>
      <div className={cn("w-full h-full text-white")}>
        <SearchInput />

        <div className="mt-[45px] mx-[85px]">
          <WeatherInfo data={weatherData as WeatherData} />
        </div>
      </div>
    </Suspense>
  );
}

function WeatherInfo({ data }: { data: WeatherData | null }): JSX.Element {
  const { visibility, wind, main } = data || {};

  return (
    <div className="text-white flex flex-col">
      {/**location and date */}

      <div className="flex items-start w-auto h-auto gap-3">
        <IoLocationSharp size={27} color="#D13535" />
        <div className="flex flex-col ">
          <h2 className="text-[25px] font-medium">{data?.name}</h2>
          <p className="font-light text-[18px]">
            {formatDate(Number(data?.dt))}
          </p>
        </div>
      </div>

      {/**weather description */}
      <div className=" flex flex-col py-2 gap-[80px] items-center justify-center bg-slate-400">
        <div className="flex flex-col items-center justify-center">
          <Image
            src={`http://openweathermap.org/img/wn/${data?.weather[0].icon}@4x.png`}
            alt={data?.weather[0].description.toString() || ""}
            quality={100}
            width={240}
            height={600}
            className="bg-slate-700"
          />
          <div className="flex -mt-2 flex-col items-center gap-1">
            <p className="text-[40px] font-medium">{data?.main.temp}°C</p>
            <p className="text-[20px] font-light">
              {data?.weather[0].description}
            </p>
          </div>
        </div>

        <div className="bg-slate-950 flex items-center h-[150px] justify-center w-[90%]">
          <div className="flex w-full justify-around">
            {/**MAP OTHER WEATHER INFO HERE */}
            {/**PRESSURE, HUMIDITY, VISIBLITY, WIND */}
            <div>
              <p>Pressure</p>
              <p>{main?.pressure} hPa</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
