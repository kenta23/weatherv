"use client";


import { Area, AreaChart, XAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Suspense } from "react";
import { Skeleton } from "./ui/skeleton";

export function SeaLevelChart({
  label,
  value,
}: {
  label: string;
  value: number;
}) {
  const chartData = [
    { title: "0", level: "0" },
    { title: "normal", level: 1013.25 },
    { title: "current", level: value },
  ];

  const chartConfig = {
    level: {
      label: label,
      color: "#fff",
    },
  } satisfies ChartConfig;

  return (
    <Suspense fallback={<Skeleton className="w-full h-[120px] rounded-lg bg-slate-400" />}>
      <ChartContainer
        className="py-2 w-full text-white h-[100px] md:h-[120px] lg:h-[140px] xl:h-[150px]"
        config={chartConfig}
      >
        <AreaChart
          accessibilityLayer
          data={chartData}
          margin={{
            left: 20,
            right: 12,
          }}
        >
         

          <XAxis
            dataKey="title"
            tickLine={false}
            axisLine={false}
            tick={{
              fill: "#ffff",
              fillOpacity: 1,
              opacity: 1,
            }}
            tickMargin={6}
            fill="#ffff"
            tickFormatter={(value) => value + " hPa"}
          />
          <ChartTooltip cursor={false} content={<ChartTooltipContent />} />

          <defs>
            <linearGradient id="fillSeaLevel" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="blue" stopOpacity={0.8} />
              <stop offset="95%" stopColor="red" stopOpacity={0.1} />
            </linearGradient>
          </defs>

          <Area
            dataKey="level"
            type="natural"
            fill="url(#fillSeaLevel)"
            fillOpacity={0.9}
            stroke="#fff"
            stackId="a"
          />
        </AreaChart>
      </ChartContainer>
    </Suspense>
  );
}




