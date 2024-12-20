import {  getAirQualityIndex, getMyWeatherData, getOneWeekForecast, searchCity } from "@/actions/data";
import { Cityname, WeeklyWeatherApiResponse } from "@/types/weather";
import { useQuery } from "@tanstack/react-query";

export function useGetAirQuality(coords: { lat: number; lon: number } ) {

  return useQuery({
    queryKey: ["airQuality"],
    refetchInterval: 150 * 1000,
    queryFn: async () => {
      try {
        
        const { lat, lon } = coords;

        const data = await getAirQualityIndex({
          lat: lat.toString(),
          lon: lon.toString(),
        });

        return data;
      } catch (error) {
        console.log(error);
      }
    },
  });
}

export function useGetWeatherInfo({ lat, lon }: { lat: number; lon: number }) {
  return useQuery({
    queryKey: ["weatherData"],
    refetchInterval: 150 * 1000,
    queryFn: async () => {
      const data = await getMyWeatherData({
        lat: lat.toString(),
        lon: lon.toString(),
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
     gcTime: 0,
     
     
     queryFn: async () => {
         try {
          const data = await searchCity(cityname);
         
          return data as Cityname[] || [];
         } catch (error) {
          console.log(error);
          return [];
         }
     }
   })
}
