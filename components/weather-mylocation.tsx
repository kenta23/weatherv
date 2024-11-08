"use client";

import { WeatherData } from "@/types/weather";
import { Suspense, useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { useWeatherBackground } from "@/app/store/store";
import { cn, formatDate } from "@/lib/utils";
import SearchInput from "./search-input";
import { IoLocationSharp } from "react-icons/io5";
import { getMyWeatherData } from "@/actions/data";

export default function MyWeatherInfo() {
  const [weatherData, setData] = useState<WeatherData | null>(null);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const cachedGetWeatherData = useCallback(getMyWeatherData, []);
  const { setBackground, background } = useWeatherBackground();

  useEffect(() => {
    // Check if geolocation is supported
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;

          const data = await cachedGetWeatherData({
            lat: latitude.toString(),
            lon: longitude.toString(),
          });

          setData(data);
          console.log("DATA FROM CLIENT", data);

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
        },
        (error) => {
          setData(null);
          console.error(error);
        }
      );
    } else {
      setData(null);
      setBackground("", "day");
      console.log("Geolocation is not supported by this browser.");
    }
  }, [cachedGetWeatherData, setBackground]);

  return (
    <Suspense fallback={<p>Loading</p>}>
      <div className={cn("w-full h-full text-white")}>
        <SearchInput />

        <div className="mt-[55px] mx-[85px]">
          <WeatherInfo data={weatherData} />
        </div>
      </div>
    </Suspense>
  );
}

function WeatherInfo({ data }: { data: WeatherData | null }): JSX.Element {
  return (
    <div>
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
    </div>
  );
}
