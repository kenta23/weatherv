"use client";

import { WeatherData } from "@/types/weather";
import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { useWeatherBackground } from "@/store/store";
import { cn, formatDate } from "@/lib/utils";
import SearchInput from "./search-input";
import { IoLocationSharp } from "react-icons/io5";

export default function MyWeatherInfo({
  getMyWeatherData,
}: {
  getMyWeatherData: ({
    lat,
    lon,
  }: {
    lat: string;
    lon: string;
  }) => Promise<WeatherData | null>;
}) {
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
              data?.weather[0]?.description.toString() || "white",
              "night"
            );
          } else {
            setBackground(
              data?.weather[0]?.description.toString() || "white",
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
      console.log("Geolocation is not supported by this browser.");
    }
  }, [cachedGetWeatherData, setBackground]);

  return (
    <div className={cn("w-full h-full text-white")}>
      <SearchInput />

      <main className="mt-[55px] mx-[85px]">
        <WeatherInfo data={weatherData} />
      </main>
    </div>
  );
}

function WeatherInfo({ data }: { data: WeatherData | null }): JSX.Element {
  return (
    <aside>
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
    </aside>
  );
}
