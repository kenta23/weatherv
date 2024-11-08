"use server";

import { WeatherData } from "@/types/weather";
import axios from "axios";
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
    const response = await axios.get(
      current_weather_api +
        `lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    );

    if (!response.status) {
      return null;
    }

    console.log("RESPONSE FROM SERVER", response);
    return (await response.data) || [];
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function updateWeather() {
  return revalidateTag("weatherData");
}
