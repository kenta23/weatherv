import { getAirQualityIndex, getMyWeatherData, getOneWeekForecast } from "@/actions/data";
import { WeeklyWeatherApiResponse } from "@/types/weather";
import { useQuery } from "@tanstack/react-query";

export function useGetAirQuality() {
  return useQuery({
    queryKey: ["airQuality"],
    queryFn: async () => {
      try {
        const mylocation = await fetch("https://ipwho.is/")
          .then((res) => res.json())
          .then((data) => data);

        const { latitude, longitude } = await mylocation;

        const data = await getAirQualityIndex({
          lat: latitude.toString(),
          lon: longitude.toString(),
        });

        return data;
      } catch (error) {
        console.log(error);
      }
    },
  });
}

export function useGetWeatherInfo() {
  return useQuery({
    queryKey: ["weatherData"],
    refetchInterval: 150 * 1000,
    queryFn: async () => {
      const mylocation = await fetch("https://ipwho.is/", {
        cache: "no-store",
        next: { revalidate: 0 },
      })
        .then((res) => res.json())
        .then((data) => data);

      const { latitude, longitude } = await mylocation;

      const data = await getMyWeatherData({
        lat: latitude.toString(),
        lon: longitude.toString(),
      });

      return data;
    },
  });
}

export function useGetWeeklyForecast({
   lat,
   lon
}: { 
  lat: number;
  lon: number
} ) { 
  return useQuery({ 
     queryKey: ["weeklyForecast"],
     queryFn: async () => {
         const data: WeeklyWeatherApiResponse | null = await getOneWeekForecast({ 
          lat,
          lon
         })
         return data || null;
     }
  })
}
