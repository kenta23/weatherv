"use client";

import { cn } from "@/lib/utils";
import { useWeatherBackground } from "@/store/store";
import Image from "next/image";
import React from "react";

export default function BackgroundProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { background } = useWeatherBackground();

  const weatherCondition = [
    {
      icon_name: {
        day: "11d",
        night: "11n",
      },
      name: "thunderstorm",
      image_url: "/thunderstorm.gif",
      icon_url: {
        day: "https://openweathermap.org/img/wn/11d@2x.png",
        night: "https://openweathermap.org/img/wn/11n@2x.png",
      },
    },
    {
      icon_name: {
        day: "09d",
        night: "09n",
      },
      name: "drizzle",
      image_url: "/drizzle.gif",
      icon_url: {
        day: "https://openweathermap.org/img/wn/09d@2x.png",
        night: "https://openweathermap.org/img/wn/09n@2x.png",
      },
    },
    {
      icon_name: {
        day: "10d",
        night: "10n",
      },
      name: "Rain",
      image_url: "/rainy_1.gif",
      icon_url: {
        day: "https://openweathermap.org/img/wn/10d@2x.png",
        night: "https://openweathermap.org/img/wn/10n@2x.png",
      },
    },
    {
      icon_name: {
        day: "13d",
        night: "13n",
      },
      name: "Snow",
      image_url: "/snowfall.gif",
      icon_url: {
        day: "https://openweathermap.org/img/wn/13d@2x.png",
        night: "https://openweathermap.org/img/wn/13n@2x.png",
      },
    },
    {
      icon_name: {
        day: "50d",
        night: "50n",
      },
      name: "atmosphere",
      image_url: "/atmosphere.png",
      icon_url: {
        day: "https://openweathermap.org/img/wn/50d@2x.png",
        night: "https://openweathermap.org/img/wn/50n@2x.png",
      },
    },
    {
      icon_name: {
        day: "01d",
        night: "01n",
      },
      name: "clear sky",
      image_url: "/stars.jpg",
      icon_url: {
        day: "https://openweathermap.org/img/wn/01d@2x.png",
        night: "https://openweathermap.org/img/wn/01n@2x.png",
      },
    },
    {
      icon_name: {
        day: "02d",
        night: "02n",
      },
      name: "few clouds",
      image_url: "/few_clouds.jpg",
      icon_url: {
        day: "https://openweathermap.org/img/wn/02d@2x.png",
        night: "https://openweathermap.org/img/wn/02n@2x.png",
      },
    },
    {
      icon_name: {
        day: "03d",
        night: "03n",
      },
      name: "scattered clouds",
      image_url: "/scattered_clouds.jpg",
      icon_url: {
        day: "https://openweathermap.org/img/wn/03d@2x.png",
        night: "https://openweathermap.org/img/wn/03n@2x.png",
      },
    },
    {
      icon_name: {
        day: "04d",
        night: "04n",
      },
      name: "broken clouds",
      image_url: "/broken_clouds.jpg",
      icon_url: {
        day: "https://openweathermap.org/img/wn/04d@2x.png",
        night: "https://openweathermap.org/img/wn/04n@2x.png",
      },
    },
    {
      icon_name: {
        day: "04d",
        night: "04n",
      },
      name: "overcast clouds",
      image_url: "",
      icon_url: {
        day: "https://openweathermap.org/img/wn/04d@2x.png",
        night: "https://openweathermap.org/img/wn/04n@2x.png",
      },
    },
  ];

  const selectedBg = weatherCondition.find(
    ({ icon_name: { day, night } }) =>
      background.icon_name === day || background.icon_name === night
  );

  console.log("background", background);

  return (
    <div
      className={cn(
        "min-h-screen  relative h-full w-full bg-blend-soft-light",
        {
          "bg-gradient-to-tr from-[#222223] to-[#3D3E40]":
            background.time === "night",
          "bg-gradient-to-tr from-[#558BEE] to-[#E9F3FB]":
            background.time === "day",
        }
      )}
    >
      {/**OVERLAY BACKGROUND */}
      <Image
        src={selectedBg?.image_url || "/"}
        alt="background overlay"
        className="absolute z-0 select-none top-0 object-cover mix-blend-soft-light"
        fill
        unoptimized
      />

      <div className="relative z-10">{children}</div>
    </div>
  );
}
