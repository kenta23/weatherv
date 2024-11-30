"use client";

import { cn } from "@/lib/utils";
import { useWeatherBackground } from "@/app/store/store";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import LoadingScreen from "@/components/splashscreen";
import { weatherconditions } from "@/lib/data";



type weatherConditionType = {
  icon_name: { day: string; night: string };
  name: string;
  image_url: { day: string; night: string };
  icon_url: { day: string; night: string };
}[];


export default function BackgroundProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { background } = useWeatherBackground();
  const [mounted, setMounted] = useState<boolean>(false);
  const [weatherCondition] = useState<weatherConditionType>(weatherconditions);
  const [loading, setLoading] = useState<boolean>(true);

  // console.log("background", background);

  const selectedBg = weatherCondition?.find(
    ({ icon_name: { day, night } }) =>
      background.icon_name === day || background.icon_name === night
  );

  console.log("selectedBg", selectedBg);

 

    /**will run only once the component mounts */
    /**will rerender if the its visited to city page */

  useEffect(() => {
     setMounted(true); 

     if (mounted) { 
      setTimeout(() => {
        setLoading(false);
      }, 1500);
     }

     return () => { 
        setMounted(false);
     }
  }, [mounted]);


  if (!mounted) {
    return null;
  }

   return !loading ? (
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
  ) : <LoadingScreen />
}
