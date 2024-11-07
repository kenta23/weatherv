"use client";

import { cn } from "@/lib/utils";
import { useWeatherBackground } from "@/store/store";
import Image from "next/image";
import React, { useEffect, useState } from "react";

export default function BackgroundProvider({
  children,
}: {
  children: Readonly<React.ReactNode>;
}) {
  const { background } = useWeatherBackground();

  const weatherBgConditions = {
    "bg-gradient-to-tr from-blue-500 to-yellow-500": background.time === "day",
    "bg-gradient-to-tr from-[#222223] to-[#3D3E40]":
      background.time === "night",
  };

  const weather = [
    {
      icon_name: {
        day: "11d",
        night: "11n",
      },
      name: "thunderstorm",
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
      name: "Snow",
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
      name: "Snow",
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
      name: "Scattered clouds",
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
      icon_url: {
        day: "https://openweathermap.org/img/wn/04d@2x.png",
        night: "https://openweathermap.org/img/wn/04n@2x.png",
      },
    },
  ];

  const [bg, setBg] = useState({
    image: "",
    bgcolor: "",
  });

  /** <Image
        src={"/stars.jpg"}
        alt="background overlay"
        className="absolute top-0 object-cover mix-blend-lighten"
        fill
      /> */

  console.log("bg", bg);
  console.log("background", background);
  return (
    <div
      className={cn("min-h-screen relative h-full w-full", {
        "bg-gradient-to-tr from-[#222223] to-[#3D3E40]":
          background.time === "night",
        "bg-[#222223]": background.time === "day",
        "bg-gradient-to-tr from-[#558BEE] to-[#E9F3FB]":
          background.time === "day",
      })}
    >
      <Image
        src={"/stars.jpg"}
        alt="background overlay"
        className="absolute top-0 object-cover mix-blend-soft-light"
        fill
      />
      <p className="text-green-600">Top</p>
      {children}
    </div>
  );
}
