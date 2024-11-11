import MyWeatherInfo from "@/components/weather-mylocation";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "WeatherV",
  description: "Current weather forecast",
};
export default async function Page() {
  return (
    <div className="w-full h-full min-h-screen">
      <MyWeatherInfo />
    </div>
  );
}
