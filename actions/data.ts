"use server";

import { AirQualityData, WeatherData, WeeklyWeatherApiResponse } from "@/types/weather";
import { revalidateTag } from "next/cache";

export async function getMyWeatherData({
  lat,
  lon,
}: {
  lat: string;
  lon: string;
}): Promise<WeatherData | null> {
  const current_weather_api = process.env.CURRENT_WEATHER_BASE_URL as string;
  const API_KEY = process.env.API_KEY as string;

  try {
    const response = await fetch(
      current_weather_api +
        `lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`,
      {
        next: { revalidate: 60 },
      }
    );

    if (!response.status) {
      return null;
    }

    console.log("RESPONSE FROM SERVER", response.status);

    return (await response.json()) || [];
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getAirQualityIndex({
  lat,
  lon,
}: {
  lat: string;
  lon: string;
}): Promise<AirQualityData | null> {
  const AIR_QUALITY_BASE_URL = process.env.AIR_QUALITY_BASE_URL as string;
  const API_KEY = process.env.API_KEY as string;

  try {
    const response = await fetch(
      AIR_QUALITY_BASE_URL +
        `lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    );

    if (!response.status) {
      return null;
    }

    console.log("RESPONSE FROM SERVER", response.status);

    return (await response.json()) || null;
  } catch (error) {
    console.log(error);
  }

  return null;
}

export async function updateWeather() {
  return revalidateTag("weatherData");
}


export async function getOneWeekForecast({
  lat,
  lon,
}: {
  lat: number;
  lon: number;
}): Promise<WeeklyWeatherApiResponse | null> {
  const API_KEY = process.env.API_KEY as string;
  const API_URL = process.env.WEEKLY_FORECAST_API as string;

  try {
    const data = await fetch(
      API_URL + `lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    );

    if (!data) {
      return null;
    }

    return (await data.json()) || [];

  } catch (error) {
    console.log(error);
    return null;
  }
}
