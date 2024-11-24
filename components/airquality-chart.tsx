import React from "react";
import { ChartConfig, ChartContainer } from "./ui/chart";
import { Card, CardFooter } from "./ui/card";
import {
  Label,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from "recharts";

export function AirQualityChart({ aqi }: { aqi: number }) {
  const chartData = [{ browser: "safari", aqi, fill: "#3EAE51" }];
  const chartConfig = {
    aqi: {
      label: "Air Quality",
    },
  } satisfies ChartConfig;

  return (
    <Card className="bg-transparent outline-none border-none">
      <ChartContainer config={chartConfig} className="mx-auto h-[180px]">
        <RadialBarChart
          data={chartData}
          startAngle={90}
          endAngle={aqi * 72 + 90}
          innerRadius={80}
          outerRadius={125}
        >
          {/* Define the gradient */}
          <defs>
            <linearGradient id="gradientColor" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#8b9dee" /> {/* Start color */}
              <stop offset="100%" stopColor="#D13535" /> {/* End color */}
            </linearGradient>
          </defs>

          <PolarGrid
            gridType="circle"
            radialLines={false}
            stroke="none"
            className="first:fill-[#39523D] last:fill-[#7EC189]"
            polarRadius={[86, 74]}
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

      <CardFooter className="flex-col gap-2 mt-2 text-sm">
        <div className="flex text-white items-center gap-2 font-medium leading-none">
          Good Quality
        </div>
      </CardFooter>
    </Card>
  );
}
