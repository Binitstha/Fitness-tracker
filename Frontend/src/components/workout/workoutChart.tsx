"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { workoutType } from "@/types/types";
import { useState, useEffect } from "react";

export const description = "An interactive bar chart";

const chartConfig = {
  calories: {
    label: "Calories Burned",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

type ChartData = {
  date: string;
  calories: number;
};

const WorkOutChart = ({ workoutData }: { workoutData: workoutType[] }) => {
  const [chartData, setChartData] = useState<ChartData[]>([]);

  useEffect(() => {
    const aggregateCalories = (data: workoutType[]): ChartData[] => {
      const calorieMap: { [key: string]: number } = {};

      data.forEach((workout) => {
        const { date, calories } = workout;
        if (calorieMap[date]) {
          calorieMap[date] += calories;
        } else {
          calorieMap[date] = calories;
        }
      });

      return Object.keys(calorieMap)
        .map((date) => ({
          date,
          calories: calorieMap[date],
        }))
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    };

    const aggregatedData = aggregateCalories(workoutData);

    const latest15Data = aggregatedData.slice(-15);
    setChartData(latest15Data);
  }, [workoutData]);

  return (
    <div className="w-[90%] py-3">
      <ChartContainer config={chartConfig} className="w-full">
        <BarChart data={chartData}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="date"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => value.slice(5)}
          />
          <YAxis />
          <ChartTooltip content={<ChartTooltipContent nameKey="calories" />} />
          <ChartLegend content={<ChartLegendContent />} />
          <Bar
            dataKey="calories"
            fill="var(--color-calories)"
            radius={4}
            barSize={30}
          />
        </BarChart>
      </ChartContainer>
    </div>
  );
};

export default WorkOutChart;
