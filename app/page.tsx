import { getMyWeatherData } from "@/actions/data";
import MyWeatherInfo from "@/components/weather-mylocation";

export default async function Home() {
  return (
    <div className="w-full h-full">
      <MyWeatherInfo getMyWeatherData={getMyWeatherData} />
    </div>
  );
}
