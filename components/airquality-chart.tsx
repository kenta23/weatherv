import React, { useEffect, useState } from "react";
import { ChartConfig, ChartContainer } from "./ui/chart";
import { Card, CardFooter } from "./ui/card";
import {
  Label,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
  ResponsiveContainer,
} from "recharts";

export function AirQualityChart({ aqi }: { aqi: number }) {
  const chartData = [{ aqi, fill: "url(#aqiGradientColor)" }];
  const chartConfig = {
    aqi: {
      label: "Air Quality",
    },
  } satisfies ChartConfig;

  const aqiLabels = ["Good", "Fair", "Moderate", "Poor and Unhealthy", "Very Unhealthy"];

  const [aqiScreenWidth, setaqiScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setaqiScreenWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);


  return (
    <Card className="outline-none shadow-none border-none bg-transparent
     aspect-auto max-w-auto">
     <ResponsiveContainer width={250} height={"100%"}>
      <ChartContainer  
            config={chartConfig}
            color="#fff"
            className="mx-auto min-h-[178px] text-white">
      <RadialBarChart
          data={chartData}
          startAngle={90}
          className='w-svw h-svh'
          endAngle={aqi * 72 + 90}
          innerRadius={aqiScreenWidth < 725 ? 70 : 80}
          outerRadius={aqiScreenWidth < 725 ? 110 : 120}
        >
          {/* Define the gradient */}
          <defs>
            <linearGradient id="aqiGradientColor" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#17d440" /> {/* Start color */}
              <stop offset="100%" stopColor="#e60b29" /> {/* End color */}
            </linearGradient>
          </defs>

          <PolarGrid
            gridType="circle"
            radialLines={false}
            stroke="none"
            className="first:fill-[#f1ebe7] last:fill-[#a3a8a4]"
            polarRadius={aqiScreenWidth < 725 ? [75, 65] : [87, 75]}
            
          />
          <RadialBar dataKey="aqi" background cornerRadius={10} />

          <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
            <Label
              content={({ viewBox }) => {
                if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                  return (
                    <text
                      x={viewBox.cx}
                      y={viewBox.cy}
                      textAnchor="middle"
                      dominantBaseline="middle"
                    >
                      <tspan
                        x={viewBox.cx}
                        y={viewBox.cy}
                        className="fill-white text-4xl font-bold"
                      >
                        {chartData[0].aqi.toLocaleString()}
                      </tspan>
                      <tspan
                        x={viewBox.cx}
                        y={(viewBox.cy || 0) + 24}
                        className="fill-white"
                      >
                        Air Quality Index
                      </tspan>
                    </text>
                  );
                }
              }}
            />
          </PolarRadiusAxis>
        </RadialBarChart>
      </ChartContainer>
      
      </ResponsiveContainer>

      <CardFooter className="flex-col gap-2 mt-2 text-sm">
        <div className="flex text-white items-center gap-2 font-medium leading-none">
           <span>{aqiLabels[aqi - 1]}</span>
        </div>
      </CardFooter>
    </Card>
  );
}
