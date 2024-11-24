import { getAirQualityIndex, getMyWeatherData } from "@/actions/data";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import React from "react";

export default async function HydrateQueryClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 120 * 1000, // 2 minutes
      },
    },
  });

  await queryClient.prefetchQuery({
    queryKey: ["weatherData"],
    queryFn: async () => {
      const mylocation = await fetch("https://ipwho.is/")
        .then((res) => res.json())
        .then((data) => data);

      const { latitude, longitude } = await mylocation;
      const weatherData = await getMyWeatherData({
        lat: latitude.toString(),
        lon: longitude.toString(),
      });
      return weatherData || [];
    },
  });

  await queryClient.prefetchQuery({
    queryKey: ["airQuality"],
    queryFn: async () => {
      const mylocation = await fetch("https://ipwho.is/")
        .then((res) => res.json())
        .then((data) => data);

      const { latitude, longitude } = await mylocation;

      const airQuality = await getAirQualityIndex({
        lat: latitude.toString(),
        lon: longitude.toString(),
      });
      return airQuality || [];
    },
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {children}
    </HydrationBoundary>
  );
}
