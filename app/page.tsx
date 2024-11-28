import Weather from "@/components/weather";
import { Metadata } from "next";


export const metadata: Metadata = {
  title: "WeatherV",
  description: "Current weather forecast",
};


export default async function Page() {
  //fetch location coords 
  const location = await fetch("https://ipwho.is/", {
    cache: "no-store",
  })
    .then((res) => res.json())
    .then((data) => data);

  const { latitude, longitude } = await location;
   

  return (
    <div className="w-full h-full min-h-screen">
      <Weather lat={latitude} lon={longitude}/>
    </div>
  );
}
