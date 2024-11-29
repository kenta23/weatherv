'use client';

import { useGetWeeklyForecast } from '@/lib/query'
import { Coord, WeeklyWeatherApiResponse } from '@/types/weather'
import React, { useEffect, useState } from 'react'
import { fromUnixTime, format } from 'date-fns';
import Image from 'next/image';
import { useQueryClient } from '@tanstack/react-query';


export default function WeeklyForecast ({ coord } : { coord: Coord }) {
  
  const { lat, lon } = coord
  const { data } = useGetWeeklyForecast({ lat, lon })
  
  const queryClient = useQueryClient();
  const [dailyForecast, setDailyForecast] = useState<WeeklyWeatherApiResponse['list']>([]);
  
  const filterDailyForecast = (items: WeeklyWeatherApiResponse['list']) => {
    const dailyForecastMap = new Map<string, typeof items[number]>();
  
    items.forEach(item => {
      const currentDate = format(fromUnixTime(item.dt), 'yyyy-MM-dd');
  
      // Add the first occurrence of the date to the map
      if (!dailyForecastMap.has(currentDate)) {
        dailyForecastMap.set(currentDate, item);
      }
    });
  
    // Convert the map values to an array
    return Array.from(dailyForecastMap.values());
  };


    useEffect(() => {
       if (coord) { 
        queryClient.invalidateQueries({ queryKey: ['weeklyForecast'] });
        setDailyForecast(filterDailyForecast(data?.list || []));
       }
    }, [coord, data?.list, queryClient]);


 return (
     <div className='grid grid-cols-1 sm:grid-cols-2 md:flex md:justify-evenly gap-6 w-full overflow-x-auto'>
       {dailyForecast?.slice(1).map((item, index) => (
         <div
           className="bg-[#E8EDF0]/20 rounded-[20px] backdrop-opacity-10 w-full sm:max-w-[280px] h-[265px] px-1 py-2  rounded[20px]"
           key={index}
         >
           <div className="flex opacity-100 flex-col items-center gap-3">
             <h4 className='text-center w-auto text-[22px]'>{format(fromUnixTime(item.dt), 'EEEE')}</h4>
             

             <div className='space-y-3 flex flex-col items-center'>
                 {/**ICON, TEMPERATURE */}

                 <div className='flex flex-col items-center'>
                      <Image 
                        src={`http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                        alt={item.weather[0].description}
                        width={95}
                        height={120}
                        priority
                      />

                      <p className='text-[25px] -mt-2 font-medium'>{item.main.temp} °C</p>
                 </div>


                 <div className='items-center gap-1 flex flex-col'>
                     {/**LOW AND HIGH TEMP */}
                     <p className='text-sm font-light text-gray-100'>Low: {item.main.temp_min} °C</p>
                     <p className='text-sm font-light text-gray-100'>High: {item.main.temp_max} °C</p>
                 </div>
             </div>
           </div>

           <br />
         </div>
       ))}
     </div>
  );
}
