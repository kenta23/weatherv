import MyWeatherInfo from "@/components/weather-mylocation";
import { Suspense } from "react";

export default async function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="w-full h-full min-h-screen py-10">
        <MyWeatherInfo />
      </div>
    </Suspense>
  );
}
