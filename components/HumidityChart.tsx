import React, { Suspense } from 'react'
import { ChartConfig, ChartContainer } from './ui/chart';
import { Label, PolarGrid, PolarRadiusAxis, RadialBar, RadialBarChart } from 'recharts';
import { Skeleton } from './ui/skeleton';

export function RadialChartComponent({
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
        color: "hsl(var(--chart-2))",
      },
    } satisfies ChartConfig;
  
    return (
      <Suspense fallback={<Skeleton className='size-[180px] rounded-full bg-slate-400'/>}>
        <ChartContainer
          config={chartConfig}
          color="#fff"
          className="mx-auto text-white w-auto h-[180px]"
        >
          <RadialBarChart
            data={chartData}
            startAngle={90}
            endAngle={90 + value * 3.6}
            innerRadius={80}
            outerRadius={120}
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
              className="first:fill-[#52393F] last:fill-[#c0a4b1]"
              polarRadius={[86, 74]}
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
                          {Number(chartData[0].data.toFixed(2)) <= 40
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
      </Suspense>
    );
  }
  
