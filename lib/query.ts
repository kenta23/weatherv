import { getAirQualityIndex, getMyWeatherData, getOneWeekForecast, searchCity } from "@/actions/data";
import { Cityname, WeeklyWeatherApiResponse } from "@/types/weather";
import { useQuery } from "@tanstack/react-query";

export function useGetAirQuality() {
  return useQuery({
    queryKey: ["airQuality"],
    refetchInterval: 150 * 1000,
    queryFn: async () => {
      try {
        const mylocation = await fetch("http://ipwho.is/")
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
      const mylocation = await fetch("http://ipwho.is/", {
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
     refetchInterval: 150 * 1000,
     queryFn: async () => {
         const data: WeeklyWeatherApiResponse | null = await getOneWeekForecast({ 
          lat,
          lon
         })
         return data || null;
     }
  })
}

export function useSearchCity(cityname: string) { 
   return useQuery({
     queryKey: ["searchCity"],
     enabled: !!cityname,
     staleTime: 0,
     refetchOnMount: true,
     gcTime: 0,
     
     
     queryFn: async () => {
         try {
          const data = await searchCity(cityname);
          if(!data) { 
            return [];
          }

          return data as Cityname[];
         } catch (error) {
          console.log(error);
          return [];
         }
     }
   })
}
