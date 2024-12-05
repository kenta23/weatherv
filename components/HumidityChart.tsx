'use client';

import React, { Suspense, useEffect, useState } from 'react'
import { ChartConfig, ChartContainer } from './ui/chart';
import { Label, PolarGrid, PolarRadiusAxis, RadialBar, RadialBarChart, ResponsiveContainer } from 'recharts';
import { Skeleton } from './ui/skeleton';

export function RadialChartComponent({
    label,
    value,
  }: {
    label: string;
    value: number;
  }) {
    const chartData = [
      { data: value, fill: "url(#gradientColor)" },
    ];
  
    const chartConfig = {
      data: {
        label: label,
      },
    } satisfies ChartConfig;
  
   const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);


    return (
      <Suspense
        fallback={
          <Skeleton className="size-[180px] rounded-full " />
        }
      >

        <ResponsiveContainer width={500} height="100%">
          <ChartContainer
            config={chartConfig}
            color="#fff"
            className="mx-auto text-white"
          >
            <RadialBarChart
              data={chartData}
              barSize={15}
              className='w-svw h-svh'
              startAngle={90}
              endAngle={90 + value * 3.6}
              innerRadius={screenWidth < 725 ? 55 : 80}
              outerRadius={screenWidth < 725 ? 100 : 120}
            >
              {/* Define the gradient */}
              <defs>
                <linearGradient id="gradientColor" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#4777c9" /> {/* Start color */}
                  <stop offset="100%" stopColor="#104bb0" /> {/* End color */}
                </linearGradient>
              </defs>

              <PolarGrid
                gridType="circle"
                radialLines={false}
                stroke="none"
                className="first:fill-[#d5d9e2] last:fill-[#6f9cc5]"
                polarRadius={screenWidth < 725 ? [62, 50] : [87, 75]}
              />

              <RadialBar dataKey="data" background cornerRadius={10} />

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
                          className="text-sm space-y-3"
                        >
                          <tspan
                            x={viewBox.cx}
                            y={viewBox.cy}
                            className="text-xl md:text-4xl font-bold text-white"
                          >
                            {chartData[0].data.toLocaleString() + "%"}
                          </tspan>
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 24}
                            color="#fff"
                            className='text-[10px] sm:text-md md:text-[14px]'
                            textAnchor="middle"
                            dominantBaseline="middle"
                          >
                            {chartData[0].data < 45
                              ? "Low Humidity"
                              : chartData[0].data >= 45 &&
                                chartData[0].data <= 55
                              ? "Normal Humidity"
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
        </ResponsiveContainer>
      </Suspense>
    );
  }
  
