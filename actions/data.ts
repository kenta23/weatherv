"use cache";

import { WeatherData } from "@/types/weather";
import {
  unstable_cacheLife as cacheLife,
  unstable_cacheTag as cacheTag,
} from "next/cache";

export async function getMyWeatherData({
  lat,
  lon,
}: {
  lat: string;
  lon: string;
}): Promise<WeatherData | null> {
  const current_weather_api = process.env.CURRENT_WEATHER_BASE_URL as string;
  const API_KEY = process.env.API_KEY as string;

  cacheLife("minutes");
  cacheTag("localweatherdata");

  try {
    const response = await fetch(
      current_weather_api +
        `lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    );

    if (!response.ok) {
      return null;
    }

    console.log("RESPONSE FROM SERVER", response);
    return (await response.json()) || [];
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getSeachedCityWeatherData(cityname: string) {
  const geocoding_api = process.env.CURRENT_WEATHER_BASE_URL as string;
}
