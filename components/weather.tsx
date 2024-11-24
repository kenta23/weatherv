"use client";

import { WeatherData } from "@/types/weather";
import { useEffect } from "react";
import { useWeatherBackground } from "@/app/store/store";
import { cn } from "@/lib/utils";
import SearchInput from "./search-input";
import { WeatherInfo } from "./weather-info";
import { useGetWeatherInfo } from "@/lib/query";
import { useQueryClient } from "@tanstack/react-query";


export default function Weather({ lat, lon }: { lat: number; lon: number }) {
  const { setBackground } = useWeatherBackground();
  const { data: weatherData, isLoading } = useGetWeatherInfo({ lat, lon});
  const queryClient = useQueryClient();
 

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

   // Refetch data when coordinates change
   useEffect(() => {
    queryClient.invalidateQueries( {
       queryKey: ['weatherData'],
    })
    queryClient.invalidateQueries( {
      queryKey: ['airQuality'],
   })
   queryClient.invalidateQueries( {
    queryKey: ['weeklyForecast'],
 })
    
  }, [lat, lon, queryClient]);

  console.log("DATA FROM CLIENT", weatherData);
  console.log("loading", isLoading);

  return (
    <div className={cn("w-full h-full min-h-screen first-letter:text-white")}>
      <SearchInput />

      {/* WEATHER ALL INFOS */}
      <div className="mt-[45px] mx-[20px] md:mx-[55px] lg:mx-[85px]">
        <WeatherInfo key={weatherData?.id} data={weatherData as WeatherData} />
      </div>

    </div>
  );
}
