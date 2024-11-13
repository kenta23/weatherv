import { useGetWeeklyForecast } from '@/lib/query'
import { formatDate } from '@/lib/utils'
import { Coord, WeeklyWeatherApiResponse } from '@/types/weather'
import React from 'react'
import { fromUnixTime, format } from 'date-fns';


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
    <div>
        <p>Date now {fromUnixTime(1731477600).toLocaleTimeString()}</p>
        <p>date in date {new Date().toLocaleDateString()}</p>

        <br />
        <br />

      
        {dailyForecast?.slice(1).map((item, index) => (
        <div key={index}>
          <p>Date: {format(fromUnixTime(item.dt), 'EEEE, MMMM d')}</p>
          <p>Temperature: {item.main.temp} °C</p>
          <p>Wind Speed: {item.wind.speed} m/s</p>
          <p>Weather: {item.weather[0].description}</p>

          <br />
        </div>
      ))}
    </div>
  )

}
