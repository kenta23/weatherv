"use client";

import { TrendingUp } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export function SeaLevelChart({
  label,
  value,
}: {
  label: string;
  value: number;
}) {
  const chartData = [
    { title: "0", level: 0 },
    { title: "normal", level: 1013.25 },
    { title: "current", level: value },
  ];

  const chartConfig = {
    level: {
      label: "Sea Level: ",
      color: "#fff",
    },
  } satisfies ChartConfig;

  return (
    <ChartContainer
      className="py-2 w-full text-white h-[120px]"
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
        <CartesianGrid vertical={false} horizontal={false} />

        <XAxis
          dataKey="title"
          tickLine={false}
          axisLine={false}
          tick={{
            fill: "white",
            fillOpacity: 1,
            stroke: "#fff",
            strokeOpacity: 0.8,
            color: "#fff",
            opacity: 1,
            style: {
              color: "white",
            },
          }}
          tickMargin={6}
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
          fillOpacity={0.7}
          stroke="#fff"
          stackId="a"
        />
      </AreaChart>
    </ChartContainer>
  );
}
