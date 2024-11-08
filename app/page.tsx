"use client";

import MyWeatherInfo from "@/components/weather-mylocation";

export default function Home() {
  return (
    <div className="w-full h-full min-h-screen py-10">
      <MyWeatherInfo />
    </div>
  );
}
