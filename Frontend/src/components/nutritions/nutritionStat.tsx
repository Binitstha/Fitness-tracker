"use client";

import { TrendingUp } from "lucide-react";
import { Pie, PieChart, Legend } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useEffect, useState } from "react";
import { mealDataType } from "@/types/types";

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

const dailyGoals = {
  protein: 100, // in grams
  carbs: 250, // in grams
  fats: 70, // in grams
  calories: 2000, // in kcal
};

type chartDataType = {
  name: string;
  value: number;
  fill: string;
};

const NutritionStat = ({ mealData }: { mealData: mealDataType[] }) => {
  const [chartData, setChartData] = useState<chartDataType[]>([]);
  const currentDate = new Date().toLocaleDateString();

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
        if (date === currentDate) {
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
        }
      });

      const currentMealData = mealMap[currentDate] || {
        totalProtein: 0,
        totalCarbs: 0,
        totalFats: 0,
        totalCalories: 0,
      };

      return [
        {
          name: "Protein",
          value: currentMealData.totalProtein,
          fill: chartConfig.protein.color,
        },
        {
          name: "Carbs",
          value: currentMealData.totalCarbs,
          fill: chartConfig.carbs.color,
        },
        {
          name: "Fats",
          value: currentMealData.totalFats,
          fill: chartConfig.fats.color,
        },
        {
          name: "Calories",
          value: currentMealData.totalCalories,
          fill: chartConfig.calories.color,
        },
      ];
    };

    setChartData(aggregateMealData(mealData));
  }, [mealData, currentDate]);

  const remainingProtein =
    dailyGoals.protein -
    (chartData.find((data) => data.name === "Protein")?.value ?? 0);
  const remainingCarbs =
    dailyGoals.carbs -
    (chartData.find((data) => data.name === "Carbs")?.value ?? 0);
  const remainingFats =
    dailyGoals.fats -
    (chartData.find((data) => data.name === "Fats")?.value ?? 0);
  const remainingCalories =
    dailyGoals.calories -
    (chartData.find((data) => data.name === "Calories")?.value ?? 0);

  return (
    <Card className="flex flex-col h-full w-80">
      <CardHeader className="items-center pb-0">
        <CardTitle className="text-center">
          Today&apos;s Nutrition Breakdown
        </CardTitle>
        <CardDescription>{currentDate}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        {mealData.length > 0 ? (
          <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square max-h-[250px]"
          >
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Pie data={chartData} dataKey="value" nameKey="name" stroke="0" />
            </PieChart>
          </ChartContainer>
        ) : (
          <div className="text-center text-gray-500 h-full flex justify-center items-center">
            No meal data available for today. Please log your meals.
          </div>
        )}
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="font-medium leading-none">
          Daily Nutrition Suggestion:
        </div>
        <div className=" w-full flex flex-col gap-1 text-xs">
          <div className="flex items-center gap-2 leading-none">
            <div
              className="w-3 h-3 rounded-[30%]"
              style={{ backgroundColor: chartConfig.protein.color }}
            ></div>
            <span>
              Protein:{" "}
              {remainingProtein > 0
                ? `${Math.floor(remainingProtein)}g left`
                : "Goal reached!"}
            </span>
          </div>
          <div className="flex items-center gap-2 leading-none">
            <div
              className="w-3 h-3 rounded-[30%]"
              style={{ backgroundColor: chartConfig.carbs.color }}
            ></div>
            <span>
              Carbs:{" "}
              {remainingCarbs > 0 ? `${Math.floor(remainingCarbs)}g left` : "Goal reached!"}
            </span>
          </div>
          <div className="flex items-center gap-2 leading-none">
            <div
              className="w-3 h-3 rounded-[30%]"
              style={{ backgroundColor: chartConfig.fats.color }}
            ></div>
            <span>
              Fats:{" "}
              {remainingFats > 0 ? `${Math.floor(remainingFats)}g left` : "Goal reached!"}
            </span>
          </div>
          <div className="flex items-center gap-2 leading-none">
            <div
              className="w-3 h-3 rounded-[30%]"
              style={{ backgroundColor: chartConfig.calories.color }}
            ></div>
            <span>
              Calories:{" "}
              {remainingCalories > 0
                ? `${Math.floor(remainingCalories)} kcal left`
                : "Goal reached!"}
            </span>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default NutritionStat;
