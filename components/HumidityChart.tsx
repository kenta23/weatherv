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
      { data: value, fill: "url(#gradientColor)" },
    ];
  
    const chartConfig = {
      data: {
        label: label,
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
                <stop offset="0%" stopColor="#4777c9" /> {/* Start color */}
                <stop offset="100%" stopColor="#104bb0" /> {/* End color */}
              </linearGradient>
            </defs>

            <PolarGrid
              gridType="circle"
              radialLines={false}
              stroke="none"
              className="first:fill-[#d5d9e2] last:fill-[#6f9cc5]"
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
                          {chartData[0].data < 45
                            ? "Low Humidity"
                            : chartData[0].data >= 45 && chartData[0].data <= 55
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
      </Suspense>
    );
  }
  
