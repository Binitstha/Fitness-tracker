"use client";

import { Button } from "@/components/ui/button";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSession } from "@/context/authContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

const Page = () => {
  const router = useRouter();
  const { isAuthenticated, user, loading } = useSession();

  useEffect(() => {
    if (!loading) {
      if (!isAuthenticated) {
        router.push("/auth/login");
      }
    }
  }, [isAuthenticated, user, loading, router]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const chartData = [
    { month: "January", desktop: 186, mobile: 80 },
    { month: "February", desktop: 305, mobile: 200 },
    { month: "March", desktop: 237, mobile: 120 },
    { month: "April", desktop: 73, mobile: 190 },
    { month: "May", desktop: 209, mobile: 130 },
    { month: "June", desktop: 20, mobile: 140 },
    { month: "June", desktop: 200, mobile: 140 },
    { month: "June", desktop: 114, mobile: 140 },
    { month: "June", desktop: 150, mobile: 140 },
    { month: "June", desktop: 214, mobile: 140 },
    { month: "June", desktop: 180, mobile: 140 },
  ];

  const chartConfig = {
    desktop: {
      label: "Desktop",
      color: "#2563eb",
    },
    mobile: {
      label: "Mobile",
      color: "#60a5fa",
    },
  } satisfies ChartConfig;

  return (
    <main className="m-10 mx-28 flex gap-5">
        <section className="flex gap-5">
          <Card className="w-80">
            <CardHeader>
              <CardTitle>Workout title</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>Workout description</CardDescription>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Update</Button>
              <Button variant="destructive">Delete</Button>
            </CardFooter>
          </Card>
          <Card className="w-80">
            <CardHeader>
              <CardTitle>Workout title</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>Workout description</CardDescription>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Update</Button>
              <Button variant="destructive">Delete</Button>
            </CardFooter>
          </Card>
          <Card className="w-80">
            <CardHeader>
              <CardTitle>Workout title</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>Workout description</CardDescription>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Update</Button>
              <Button variant="destructive">Delete</Button>
            </CardFooter>
          </Card>
        </section>
        <section className=" border rounded-md w-full flex justify-center items-center">
          <div className="w-[90%]">
            <ChartContainer config={chartConfig} className=" w-full">
              <BarChart accessibilityLayer data={chartData}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  tickFormatter={(value) => value.slice(0, 3)}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <ChartLegend content={<ChartLegendContent />} />
                <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
              </BarChart>
            </ChartContainer>
          </div>
        </section>
      </div>
      <div className="sticky">
        <section>
          <Card className="w-[350px]">
            <CardHeader>
              <CardTitle>Add workout</CardTitle>
              <CardDescription>
                Deploy your new project in one-click.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form>
                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" placeholder="Name of your project" />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="framework">Framework</Label>
                    <Select>
                      <SelectTrigger id="framework">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent position="popper">
                        <SelectItem value="next">Next.js</SelectItem>
                        <SelectItem value="sveltekit">SvelteKit</SelectItem>
                        <SelectItem value="astro">Astro</SelectItem>
                        <SelectItem value="nuxt">Nuxt.js</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Cancel</Button>
              <Button>Deploy</Button>
            </CardFooter>
          </Card>
        </section>
      </div>
    </main>
  );
};

export default Page;
