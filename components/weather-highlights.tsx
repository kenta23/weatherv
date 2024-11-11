import React from "react";
import { LuWind } from "react-icons/lu";
import {
  Label,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from "recharts";

import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import LineChartComponent from "./LineChartComponent";
import { LinearLineChart } from "./LinearLineChart";
import { FaCloudRain } from "react-icons/fa6";
import { BsCloudsFill } from "react-icons/bs";
import { WeatherHighlightData } from "./weather-info";

type Precipitation = {
  label: string;
  value: { "1h": number };
};

export default function WeatherHighlights({
  data,
}: {
  data: WeatherHighlightData[];
}) {
  console.log(data);

  function StyledItem(
    index: number,
    item: WeatherHighlightData | Precipitation
  ) {
    switch (index) {
      case 0: //humidity
        return <ChartComponent label={item.label} value={Number(item.value)} />;
      case 1: //sea level
        <LineChartComponent label={item.label} value={Number(item.value)} />;
        break;
      case 2: //wind speed
        return (
          <div className="flex gap-3 items-center">
            <div className="flex flex-col gap-2 items-start">
              <h4 className="font-medium text-[32px]">
                {Number(Array.isArray(item.value) && item.value[0].speed)} m/s
              </h4>
              <p className="text-[20px] font-light">
                wind deg:{" "}
                {Number(Array.isArray(item.value) && item.value[1].degrees)}°
              </p>
            </div>
            <LuWind size={48} />
          </div>
        );
      case 3: //Feels like
        return (
          <div className="flex flex-col">
            <LinearLineChart
              label={item.label}
              value={item.value as WeatherHighlightData["value"]}
            />

            <div className="mt-4 w-full">
              <h4 className="text-[30px] font-medium">
                {Number(Array.isArray(item.value) && item.value[0].feels_like)}
                °C
              </h4>
              <p className="text-[17px] font-light">
                Real temp:{" "}
                {Number(Array.isArray(item.value) && item.value[1].temp)}°C
              </p>
            </div>
          </div>
        );
      case 4: //Precipitation
        console.log("precipitation", item.value);
        return (
          <div className="flex flex-col items-center gap-2">
            <FaCloudRain size={27} />
            <p>{item.value as number}</p>
          </div>
        );
      case 5: //Cloudiness
        return (
          <div className="flex flex-col items-center gap-2">
            <BsCloudsFill size={27} />
            <p>{item?.value?.toString()}</p>
          </div>
        );
      default:
        return <p>Not yet updated</p>;
    }
  }

  return (
    <div className="grid grid-cols-3 w-full gap-4 items-center">
      {data.map((item, index) => (
        <div
          key={index}
          className="h-[240px] backdrop-invert bg-white/15 rounded-xl drop-shadow-xl px-3 py-2 backdrop-opacity-10 w-[340px]"
        >
          <div className="flex flex-col h-full gap-1 ">
            <span className="text-xl font-normal">{item.label}</span>

            <div className="flex items-center justify-center my-auto">
              {StyledItem(index, item)}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export function ChartComponent({
  label,
  value,
}: {
  label: string;
  value: number;
}) {
  const chartData = [
    { browser: "safari", data: value, fill: "url(#gradientColor)" },
  ];

  const chartConfig = {
    data: {
      label: label,
    },
    safari: {
      label: "Safari",
      color: "hsl(var(--chart-4))",
    },
  } satisfies ChartConfig;

  return (
    <ChartContainer
      config={chartConfig}
      color="#fff"
      className="mx-auto text-white w-auto h-[170px]"
    >
      <RadialBarChart
        data={chartData}
        startAngle={90}
        endAngle={90 + (value / 100) * 360}
        innerRadius={70}
        outerRadius={105}
      >
        {/* Define the gradient */}
        <defs>
          <linearGradient id="gradientColor" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#7921B0" /> {/* Start color */}
            <stop offset="100%" stopColor="#B72531" /> {/* End color */}
          </linearGradient>
        </defs>

        <PolarGrid
          gridType="circle"
          radialLines={false}
          stroke="none"
          className="text-white"
          polarRadius={[86, 74]}
        />
        <RadialBar dataKey="data" cornerRadius={10} />
        <PolarRadiusAxis
          domain={[0, 100]}
          aria-valuemin={0}
          aria-valuemax={100}
          dataKey={value}
          tick={false}
          tickLine={false}
          axisLine={false}
        >
          <Label
            className="text-white"
            content={({ viewBox }) => {
              if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                return (
                  <text
                    x={viewBox.cx}
                    y={viewBox.cy}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill="white"
                  >
                    <tspan
                      x={viewBox.cx}
                      y={viewBox.cy}
                      className="text-4xl font-bold text-white"
                    >
                      {chartData[0].data.toLocaleString() + "%"}
                    </tspan>
                    <tspan
                      x={viewBox.cx}
                      y={(viewBox.cy || 0) + 24}
                      color="#fff"
                    >
                      {Number(chartData[0].data.toFixed(2)) * 100 <= 40
                        ? "Low to Moderate"
                        : "High Humidity"}
                    </tspan>
                  </text>
                );
              }
            }}
          />
        </PolarRadiusAxis>
      </RadialBarChart>
    </ChartContainer>
  );
}
