"use client";

import { cn } from "@/lib/utils";
import { useWeatherBackground } from "@/app/store/store";
import Image from "next/image";
import React from "react";

const weatherCondition = [
  {
    icon_name: {
      day: "11d",
      night: "11n",
    },
    name: "thunderstorm",
    image_url: 
      {
        day: "/thunderstorm.gif",
        night: "/thunderstorm.gif",
      },
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
    image_url:
      {
        day: "/drizzle.gif",
        night: "/drizzle.gif",
      },
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
    image_url:
      {
        day: "/rain_1.gif",
        night: "/rain_1.gif",
      },
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
    image_url: 
      {
        day: "/snowfall.gif",
        night: "/snowfall.gif",
      },

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
    image_url: 
      {
        day: "/fog.jpg",
        night: "/fog.jpg",
      },

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
    image_url:
      {
         day: "/Sunny glare.jpg",
          night: "/Sunny glare.jpg"
      },

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
    image_url: 
      { 
        day:  "/few_clouds.jpg",
         night:  "/few_clouds.jpg"
      },
 
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
    image_url: 
      {
        day: "/scattered_clouds.jpg",
        night: "/scattered_clouds.jpg"
      },
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
    image_url:
      {
        day: "/broken_clouds.jpg",
        night: "/broken_clouds.jpg"
      },
     
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
    image_url: 
      {
        day: "/broken_clouds.jpg",
        night: "/broken_clouds.jpg"
      },
    icon_url: {
      day: "https://openweathermap.org/img/wn/04d@2x.png",
      night: "https://openweathermap.org/img/wn/04n@2x.png",
    },
  },
];

export default function BackgroundProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { background } = useWeatherBackground();

  console.log("background", background);

  const selectedBg = weatherCondition?.find(
    ({ icon_name: { day, night } }) =>
      background.icon_name === day || background.icon_name === night
  );

  console.log("selectedBg", selectedBg);

  return (
    <div
      className={cn(
        "min-h-screen bg-blend-screen relative max-h-max h-full  w-full",
        {
          "bg-gradient-to-tr from-[#222223] to-[#3D3E40]":
            background?.time === "night",
          "bg-gradient-to-tr from-[#558BEE] to-[#E9F3FB]":
            background?.time === "day",
        }
      )}
    >
      {/**OVERLAY BACKGROUND */} 
      <Image
        src={selectedBg?.image_url[background.time as "day" | "night"] || '/Sun glare.jpg'}
        alt="background overlay"
        className="z-0 absolute select-none top-0 mix-blend-overlay brightness-50 opacity-75"
        fill
        objectPosition="center"
        objectFit="cover"
        priority
        unoptimized
      />

      <div className="relative py-10 z-10 min-h-screen h-full w-full">
        {children}
      </div>
    </div>
  );
}
