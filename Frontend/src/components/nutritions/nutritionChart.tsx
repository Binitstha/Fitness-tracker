"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltipContent,
  ChartLegendContent,
} from "@/components/ui/chart";
import { mealDataType } from "@/types/types";
import { useEffect, useState } from "react";

const chartConfig = {
  calories: {
    label: "Calories",
    color: "hsl(var(--chart-1))",
  },
  protein: {
    label: "Protein",
    color: "hsl(var(--chart-2))",
  },
  fats: {
    label: "Fats",
    color: "hsl(var(--chart-3))",
  },
  carbs: {
    label: "Carbs",
    color: "hsl(var(--chart-4))",
  },
} satisfies ChartConfig;

type chartDataType = {
  date: string;
  protein: number;
  carbs: number;
  fats: number;
  calories: number;
};

const NutritionChart = ({ mealData }: { mealData: mealDataType[] }) => {
  const [chartData, setChartData] = useState<chartDataType[]>([]);

  useEffect(() => {
    const aggregateMealData = (data: mealDataType[]): chartDataType[] => {
      const mealMap: {
        [key: string]: {
          totalProtein: number;
          totalCarbs: number;
          totalFats: number;
          totalCalories: number;
        };
      } = {};

      data.forEach((meal) => {
        const date = new Date(meal.date).toLocaleDateString();
        const { totalProtein, totalCarbs, totalFats, totalCalories } = meal;
        if (mealMap[date]) {
          mealMap[date].totalProtein += totalProtein;
          mealMap[date].totalCarbs += totalCarbs;
          mealMap[date].totalFats += totalFats;
          mealMap[date].totalCalories += totalCalories;
        } else {
          mealMap[date] = {
            totalProtein,
            totalCarbs,
            totalFats,
            totalCalories,
          };
        }
      });

      return Object.keys(mealMap)
        .map((date) => ({
          date,
          protein: mealMap[date].totalProtein,
          carbs: mealMap[date].totalCarbs,
          fats: mealMap[date].totalFats,
          calories: mealMap[date].totalCalories,
        }))
        .sort(
          (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
        );
    };

    setChartData(aggregateMealData(mealData.slice(-15)));
  }, [mealData]);

  return (
    <Card className="w-[60rem]">
      <CardHeader>
        <CardTitle>Nutrient Breakdown</CardTitle>
        <CardDescription>
          Daily intake of Protein, Carbs, Fats, and Calories
        </CardDescription>
      </CardHeader>
      <CardContent className="h-[42rem]">
        {mealData.length > 0 ? (
        <ChartContainer config={chartConfig} className="h-full w-full">
          <BarChart data={chartData} height={1000} className="">
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis
              dataKey="date"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => new Date(value).toLocaleDateString()}
            />
            <YAxis />
            <Tooltip content={<ChartTooltipContent />} />
            <Legend content={<ChartLegendContent />} />
            <Bar
              dataKey="calories"
              stackId="a"
              fill={chartConfig.calories.color}
              barSize={30}
              radius={[0, 0, 4, 4]}
            />
            <Bar
              dataKey="carbs"
              barSize={30}
              stackId="a"
              fill={chartConfig.carbs.color}
            />
            <Bar
              dataKey="fats"
              barSize={30}
              stackId="a"
              fill={chartConfig.fats.color}
            />
            <Bar
              dataKey="protein"
              barSize={30}
              stackId="a"
              fill={chartConfig.protein.color}
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ChartContainer>
         ) : (
          <div className="text-center text-gray-500 h-full flex justify-center items-center">
            No meal data available for today. Please log your meals.
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default NutritionChart;
