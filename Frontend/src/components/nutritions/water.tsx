import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
} from "recharts";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../ui/chart";
import { Droplets, MinusIcon, PlusIcon } from "lucide-react";
import { Progress } from "../ui/progress";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../ui/drawer";
import { waterGoalType, waterType } from "@/types/types";
import { useEffect, useState } from "react";
import {
  addWater,
  getWater,
  getWaterGoal,
  setWaterGoal,
} from "@/api/water/water";
import { toast } from "../ui/use-toast";
import { formatDate } from "@/lib/utils";

const notifications = [
  {
    title: "Your call has been confirmed.",
    description: "1 hour ago",
  },
  {
    title: "You have a new message!",
    description: "1 hour ago",
  },
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Mobile",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

const waterValues = [
  { value: 10, label: "10ml" },
  { value: 25, label: "25ml" },
  { value: 50, label: "50ml" },
  { value: 100, label: "100ml" },
  { value: 500, label: "500ml" },
];

const Water = () => {
  const [waterData, setWaterData] = useState<waterType[]>([]);
  const [waterRecord, setWaterRecord] = useState<waterType[]>([]);
  const [waterGoalData, setWaterGoalData] = useState<waterGoalType>();
  const [newGoal, setNewGoal] = useState<number>(waterGoalData?.target || 1000);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const aggregateWaterData = (data: waterType[]): waterType[] => {
    const waterMap: {
      [key: string]: number;
    } = {};

    data.forEach((water) => {
      const date = new Date(water.date).toLocaleDateString();
      const { amount } = water;
      if (waterMap[date]) {
        waterMap[date] += amount;
      } else {
        waterMap[date] = amount;
      }
    });

    return Object.keys(waterMap)
      .map((date) => ({
        date,
        amount: waterMap[date],
      }))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  };

  const checkAndResetWaterData = (data: waterType[]): waterType[] => {
    const today = new Date().toLocaleDateString();
    if (data.length > 0) {
      const lastEntryDate = new Date(
        data[data.length - 1].date,
      ).toLocaleDateString();
      if (today !== lastEntryDate) {
        return [];
      }
    }
    return data;
  };

  useEffect(() => {
    const fetch = async () => {
      const data = await getWater();
      setWaterRecord(data);
      const waterGoal = await setWaterGoal({ target: 1000, achieved: false });
      setWaterGoalData(waterGoal);
      setWaterData(aggregateWaterData(checkAndResetWaterData(data.slice(-15))));
    };
    fetch();
  }, []);

  const onAddWater = async (value: number) => {
    const date = new Date().toLocaleString();
    const data: waterType = {
      date: date,
      amount: value,
    };

    try {
      const newData = await addWater(data);
      setWaterRecord((prev) => [...prev, newData]);
      setWaterData((prev) => {
        const updatedData = [...prev, newData];
        return aggregateWaterData(updatedData.slice(-15));
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Card className="w-full h-full">
        <CardHeader>
          <CardTitle className=" text-center">Water</CardTitle>
        </CardHeader>
        <CardContent>
          <div>
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
                  stroke="var(--color-desktop)"
                  strokeWidth={2}
                  dot={{
                    fill: "var(--color-desktop)",
                  }}
                  activeDot={{
                    r: 6,
                  }}
                />
              </LineChart>
            </ChartContainer>
          </div>
          <div className=" mt-4 flex-col flex gap-4">
            <div className=" flex flex-col justify-center items-center gap-2 px-10">
              <p>Today&apos;s Goal</p>
              <Progress
                value={
                  waterGoalData
                    ? (waterData.reduce((sum, item) => sum + item.amount, 0) /
                        waterGoalData.target) *
                        100 >
                      100
                      ? 100
                      : (waterData.reduce((sum, item) => sum + item.amount, 0) /
                          waterGoalData.target) *
                        100
                    : 0
                }
              />
              <span>
                {waterData.reduce((sum, item) => sum + item.amount, 0)}/
                {waterGoalData?.target} ml
              </span>
            </div>
            <div className="w-full p-2 flex justify-around items-center ">
              {waterValues.map((water, index) => (
                <div className=" flex flex-col " key={index}>
                  <Button
                    className="rounded-full h-fit w-fit p-2"
                    onClick={() => onAddWater(water.value)}
                  >
                    <Droplets />
                  </Button>
                  <span>{water.value}ml</span>
                </div>
              ))}
            </div>
            <div>
              <Card>
                <CardHeader>
                  <CardTitle className="text-center">
                    Today&apos;s Water Drinking Record
                  </CardTitle>
                </CardHeader>
                <CardContent className="grid gap-4">
                  <div className="mx-6 rounded-md px-4 ">
                    <div className="mb-3 text-center text-lg font-semibold">
                      Last 3 Records
                    </div>
                    {waterRecord
                      .sort(
                        (a, b) =>
                          new Date(b.date).getTime() -
                          new Date(a.date).getTime(),
                      )
                      .slice(0, 3)
                      .map((waterData, index) => (
                        <div
                          key={index}
                          className="flex gap-4 justify-between items-center mb-2 p-2 transition-colors duration-200"
                        >
                          <div className="flex items-center gap-2">
                            <Droplets className="text-sky-500" />
                            <p className="text-sm font-medium leading-none">
                              {waterData.amount} ml
                            </p>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {formatDate(waterData.date)}
                          </p>
                        </div>
                      ))}
                    {waterRecord.length === 0 && (
                      <div className="text-center text-sm text-muted-foreground">
                        No records available
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
            <DrawerTrigger asChild>
              <Button variant="outline">Set goal</Button>
            </DrawerTrigger>
            <DrawerContent>
              <div className="mx-auto w-full max-w-sm">
                <DrawerHeader>
                  <DrawerTitle>Set Goal</DrawerTitle>
                  <DrawerDescription>
                    Set your daily water intake goal.
                  </DrawerDescription>
                </DrawerHeader>
                <div className="p-4 pb-0">
                  <div className="flex items-center justify-center space-x-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 shrink-0 rounded-full"
                      onClick={() => setNewGoal((prev) => prev - 100)}
                    >
                      <MinusIcon className="h-4 w-4" />
                      <span className="sr-only">Decrease</span>
                    </Button>
                    <div className="flex-1 text-center">
                      <div className="text-7xl font-bold tracking-tighter">
                        {newGoal ? newGoal : waterGoalData?.target}
                      </div>
                      <div className="text-[0.70rem] uppercase text-muted-foreground">
                        Calories/day
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 shrink-0 rounded-full"
                      onClick={() => setNewGoal((prev) => prev + 100)}
                    >
                      <PlusIcon className="h-4 w-4" />
                      <span className="sr-only">Increase</span>
                    </Button>
                  </div>
                  <div className="mt-3 h-[120px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={waterData} height={400}>
                        <Bar
                          dataKey="amount"
                          barSize={10}
                          style={
                            {
                              fill: "hsl(var(--foreground))",
                              opacity: 0.9,
                            } as React.CSSProperties
                          }
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                <DrawerFooter>
                  <Button
                    type="submit"
                    className="w-full"
                    onClick={() => {
                      if (waterGoalData) {
                        setWaterGoalData({ ...waterGoalData, target: newGoal });
                      } else {
                        setWaterGoalData({ target: newGoal, achieved: false });
                      }
                      toast({
                        title: "Goal set",
                        description: `Your daily goal set to ${newGoal}ml`,
                      });
                      setIsDrawerOpen(false);
                    }}
                  >
                    Save
                  </Button>
                  <DrawerClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DrawerClose>
                </DrawerFooter>
              </div>
            </DrawerContent>
          </Drawer>
        </CardFooter>
      </Card>
    </>
  );
};
export default Water;
