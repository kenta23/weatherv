"use client";

import { WeatherData } from "@/types/weather";
import { useEffect } from "react";
import { useWeatherBackground } from "@/app/store/store";
import { cn } from "@/lib/utils";
import SearchInput from "./search-input";
import { WeatherInfo } from "./weather-info";
import { useGetWeatherInfo } from "@/lib/query";

export default function MyWeatherInfo() {
  const { setBackground } = useWeatherBackground();
  const { data: weatherData, isLoading } = useGetWeatherInfo();

  useEffect(() => {
    try {
      if (weatherData?.weather[0].icon.lastIndexOf("n") !== -1) {
        setBackground(weatherData?.weather[0]?.icon.toString() || "", "night");
      } else {
        setBackground(weatherData?.weather[0]?.icon.toString() || "", "day");
      }

      console.log("running useEffect");
    } catch (error) {
      console.log(error);
    }
  }, [setBackground, weatherData?.weather]);

  console.log("DATA FROM CLIENT", weatherData);
  console.log("loading", isLoading);

  return (
    <div className={cn("w-full h-full min-h-screen first-letter:text-white")}>
      <SearchInput />

      {/* WEATHER HIGHLIGHTS */}

      <div className="mt-[45px] mx-[20px] md:mx-[55px] lg:mx-[85px]">
        <WeatherInfo data={weatherData as WeatherData} />
      </div>

    </div>
  );
}
