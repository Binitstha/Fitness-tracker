"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { Progress } from "../ui/progress";
import { useState, useEffect } from "react";
import { goalType } from "@/types/types";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import Loader from "../ui/loader";
import { formattedDate } from "@/lib/utils";

type PropsType = {
  goalData: goalType | null;
  onAddGoal: (goal: Omit<goalType, "id" | "achieved" | "userId">) => void;
};

const Goal = ({ goalData, onAddGoal }: PropsType) => {
  const [goal, setGoal] = useState<goalType | null>(goalData);
  const [currentCalories, setCurrentCalories] = useState<number>(
    goal?.currentCalories || 0,
  );

  useEffect(() => {
    if (goalData) {
      setGoal(goalData);
      setCurrentCalories(goalData.currentCalories || 0);
    }
  }, [goalData]);

  const progress = goal ? (currentCalories / goal.targetCalories) * 100 : 0;

  const formSchema = z.object({
    description: z.string().min(0, { message: "Description cannot be empty" }),
    targetDate: z.string().nonempty({ message: "Date cannot be empty" }),
    targetCalories: z
      .number()
      .min(0, { message: "Target calories cannot be lower than 0" }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: "",
      targetDate: "",
      targetCalories: 0, // Set default value to 0
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
    onAddGoal(values);
  };

  return (
    <Card className="w-[350px] p-5 shadow-lg">
      <CardHeader className="text-center">
        <CardTitle className="text-xl font-bold">Calorie Goal</CardTitle>
        <CardDescription className="text-gray-500">
          Set and track your calorie-burning goal.
        </CardDescription>
      </CardHeader>
      <CardContent className="text-center">
        {goal ? (
          <div className="my-4">
            <Progress value={progress} className="w-full h-4 rounded-full" />
            <p className="mt-2 text-sm">
              {currentCalories} / {goal.targetCalories} calories burned
            </p>
          </div>
        ) : (
          <p className="my-4 text-gray-500">
            No goal set. Set a new goal below.
          </p>
        )}
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 text-start"
          >
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter goal description" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="targetDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Target Date</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} min={formattedDate} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="targetCalories"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Target Calories (kcal)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter target calories"
                      {...field}
                      onChange={(e) => {
                        field.onChange(Number(e.target.value));
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <CardFooter className="flex justify-between mt-4">
              <Button
                variant="outline"
                type="button"
                onClick={() => form.reset()}
              >
                Cancel
              </Button>
              <Button type="submit">Save Goal</Button>
            </CardFooter>
          </form>
        </Form>
        <div className="mt-6">
          <p className="text-gray-600 italic">
            &quot;Keep going! Every step counts.&quot;
          </p>
        </div>
        {goal && (
          <div className="mt-6">
            <p className="text-sm font-bold">Achievement Badges:</p>
            <div className="flex justify-center gap-2 mt-2">
              {goal.achievements?.map((achievement) => (
                <div
                  key={achievement.id}
                  className="bg-yellow-400 p-2 rounded-full"
                >
                  🏅 {achievement.title}
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default Goal;
