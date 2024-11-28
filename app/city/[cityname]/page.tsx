import { searchCity } from '@/actions/data';
import MyWeatherInfo from '@/components/weather';
import { Cityname } from '@/types/weather';
import React from 'react'

export default async function Page({ params } : { params: Promise<{ cityname: string} >} ) {
 const cityname = (await params).cityname;

 //fetch geocoding api 
 const searchCityCoords: Cityname[] | null = await searchCity(decodeURIComponent(cityname));
 const [{ lat, lon } = {}] = searchCityCoords || [];
  
  return (
    <div className="w-full h-full min-h-screen">
      {!lat || !lon ? <div>City not found</div> : <MyWeatherInfo lat={lat} lon={lon} />}
    </div>
  );
}
