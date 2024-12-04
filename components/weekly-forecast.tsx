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
   <div className='flex w-[550px] md:w-full overflow-x-auto gap-3 overflow-y-hidden scrollbar-hide'>
      {dailyForecast?.slice(1).map((item, index) => (
         <div
           className="bg-[#E8EDF0]/10 rounded-[20px] backdrop-opacity-10 flex-1 min-w-[140px] h-full min-h-[220px] max-h-[250px] px-1 py-2 rounded[20px]"
           key={index}
         >
           <div className="flex w-full opacity-100 flex-col items-center gap-3">
             <h4 className='text-center text-[18px] md:text-[22px]'>{format(fromUnixTime(item.dt), 'EEEE')}</h4>
             

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

                      <p className='text-[18px] sm:text-md md:text-[25px] -mt-2 font-medium'>{item.main.temp} °C</p>
                 </div>


                 <div className='text-sm lg:text-md items-center gap-1 flex flex-col'>
                     {/**LOW AND HIGH TEMP */}
                     <p className=' font-light text-gray-100'>Low: {item.main.temp_min} °C</p>
                     <p className='font-light text-gray-100'>High: {item.main.temp_max} °C</p>
                 </div>
             </div>
           </div>

           <br />
         </div>
        ))}
     </div>
  );
}
