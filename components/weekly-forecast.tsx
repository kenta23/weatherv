import { useGetWeeklyForecast } from '@/lib/query'
import { formatDate } from '@/lib/utils'
import { Coord, WeeklyWeatherApiResponse } from '@/types/weather'
import React from 'react'
import { fromUnixTime, format } from 'date-fns';
import Image from 'next/image';

export default function WeeklyForecast ({ coord } : { coord: Coord }) {
  
    const {lat, lon } = coord
    const { data } = useGetWeeklyForecast({lat, lon})


    // Filter data to include only one forecast per day at 12:00 PM if available
  const dailyForecast = data?.list.reduce<WeeklyWeatherApiResponse['list']>((acc, current) => {
    const currentDate = format(fromUnixTime(current.dt), 'yyyy-MM-dd');
    const currentTime = format(fromUnixTime(current.dt), 'HH:mm');

    console.log(currentDate, currentTime);
    // Check if we already added an entry for this day
    const existingEntry = acc.find(item => format(fromUnixTime(item.dt), 'yyyy-MM-dd') === currentDate);

    // Add the entry if it's the first of the day or specifically at 12:00 PM
    if (!existingEntry && currentTime === '12:00') {
      acc.push(current);
    }
    
    // If 12:00 PM is not available, add the first entry of the day
    else if (!existingEntry && currentTime !== '12:00') {
      acc.push(current);
    }

    return acc;
  }, []);


    console.log('WEEKLY FORECAST', data)
  


    console.log(dailyForecast)
 
 return (
     <div className='grid-cols-1  sm:grid md:flex gap-6 w-full overflow-x-auto'>
       {dailyForecast?.slice(1).map((item, index) => (
         <div
           className="bg-[#E8EDF0]/20 rounded-[20px] backdrop-opacity-10 w-[280px] h-[265px] px-1 py-2  rounded[20px]"
           key={index}
         >
           <div className="flex opacity-100 flex-col gap-3">
             <h4 className='text-center w-auto text-[22px]'>{format(fromUnixTime(item.dt), 'EEEE')}</h4>
             

             <div className='space-y-3'>
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
                     <p className='text-sm font-light text-gray-100'>High: {item.main.temp_min} °C</p>
                 </div>
             </div>
           </div>

           <br />
         </div>
       ))}
     </div>
 );

}
