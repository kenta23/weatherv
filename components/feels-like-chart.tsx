"use client";
import { CartesianGrid, Line, LineChart, ResponsiveContainer } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { WeatherHighlightData } from "./weather-info";




export function LinearLineChart({ label, value }: WeatherHighlightData) {
  // Ensure `value` is an array and map the values accordingly.
  const chartData =
    Array.isArray(value) && value.length >= 2
      ? [
          { title: "Normal", temp: value[1].temp ?? 0 },
          { title: "Feels Like", temp: value[0].feels_like ?? 0 },
        ]
      : [];

  console.log("TEMPP", value);

  const chartConfig = {
    temp: {
      label,
      color: "hsl(var(--chart-1))",
    },
  } satisfies ChartConfig;

  return (
   <ResponsiveContainer  width={"100%"} height={"30px"}>
     <ChartContainer
      className="py-2 w-full h-[120px] -mb-10"
      config={chartConfig}
    >
      <LineChart accessibilityLayer data={chartData} className="text-white">
        <CartesianGrid
          color="red"
          vertical={false}
          horizontal={false}
          horizontalPoints={[0, 40]}
        />

        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />

        <Line
          dataKey="temp"
          type="monotone"
          stroke="#ffff"
          strokeWidth={4}
          dot={true}
        />
      </LineChart>
    </ChartContainer>
     </ResponsiveContainer>
  );
}
