"use client";

import { getMeal } from "@/api/meal/meal";
import { getWater } from "@/api/water/water";
import { getWorkouts } from "@/api/workout/workout";
import Dashboard from "@/components/dashboard/dashboard";
import Notification from "@/components/dashboard/notification";
import NutritionChart from "@/components/nutritions/nutritionChart";
import { Card, CardContent } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import WorkOutChart from "@/components/workout/workoutChart";
import { useSession } from "@/context/authContext";
import { mealDataType, waterType, workoutType } from "@/types/types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

const chartConfig = {
  amount: {
    label: "Water Intake",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

const Page = () => {
  const router = useRouter();
  const { isAuthenticated, user, loading } = useSession();
  const [mealData, setMealData] = useState<mealDataType[]>([]);
  const [waterData, setWaterData] = useState<waterType[]>([]);
  const [workoutData, setWorkoutData] = useState<workoutType[]>([]);

  useEffect(() => {
    if (!loading) {
      if (!isAuthenticated) {
        router.push("/auth/login");
      }
    }
  }, [isAuthenticated, user, loading, router]);

  useEffect(() => {
    const fetchMealData = async () => {
      const data = await getMeal();
      setMealData(data);
    };
    fetchMealData();
  }, [setMealData]);

  useEffect(() => {
    const fetch = async () => {
      const data = await getWater();
      setWaterData(data.slice(-10));
    };
    fetch();
  }, []);

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const data = await getWorkouts();
        setWorkoutData(data.slice(-4));
      } catch (error) {
        console.error("Error fetching workouts:", error);
      }
    };
    fetchWorkouts();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <main className="m-5 mx-auto flex gap-5 items-start justify-center">
      <section className=" flex flex-col gap-5">
        <Dashboard user={user} mealData={mealData} />
        <div className="">
          <NutritionChart mealData={mealData} />
        </div>
      </section>
      <section className="flex flex-col gap-5 w-[30rem] ">
        <Notification />
        <Card className="w-full">
          <CardContent>
            <h2 className=" py-2">Todays Water Intake</h2>
            <ChartContainer config={chartConfig} className="h-40 w-full">
              <LineChart
                accessibilityLayer
                data={waterData}
                margin={{
                  left: 12,
                  right: 12,
                }}
              >
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="date"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tickFormatter={(value) => value.slice(0, 3)}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />
                <Line
                  dataKey="amount"
                  type="natural"
                  stroke="var(--color-amount)"
                  strokeWidth={2}
                  dot={{
                    fill: "var(--color-amount)",
                  }}
                  activeDot={{
                    r: 6,
                  }}
                />
                <ChartLegend content={<ChartLegendContent />} />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>
        <div className=" w-full">
          <Card>
            <CardContent>
              <WorkOutChart workoutData={workoutData} />
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  );
};

export default Page;
