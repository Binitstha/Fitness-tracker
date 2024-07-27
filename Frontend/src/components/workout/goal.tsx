"use client";

import {
  Card,
  CardContent,
  CardDescription,
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
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { formattedDate } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

type PropsType = {
  goalData: goalType | null;
  onAddGoal: (goal: Omit<goalType, "id" | "achieved" | "userId">) => void;
  onUpdateGoal: (goal: Omit<goalType, "id" | "achieved" | "userId">) => void;
};

const Goal = ({ goalData, onAddGoal, onUpdateGoal }: PropsType) => {
  const [goal, setGoal] = useState<goalType | null>(goalData);
  const [currentCalories, setCurrentCalories] = useState<number>(0);

  // Initialize form with goal data when goalData changes
  const formSchema = z.object({
    description: z.string().min(1, { message: "Description cannot be empty" }),
    targetDate: z.string().min(1, { message: "Date cannot be empty" }),
    targetCalories: z
      .number()
      .min(1, { message: "Target calories must be at least 1" }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: "",
      targetDate: "",
      targetCalories: 1,
    },
  });

  useEffect(() => {
    if (goalData) {
      setGoal(goalData);
      setCurrentCalories(goalData.currentCalories || 0);

      form.reset({
        description: goalData.description,
        targetDate: goalData.targetDate,
        targetCalories: goalData.targetCalories,
      });
    }
  }, [goalData]);

  useEffect(() => {
    if (goal) {
      setCurrentCalories(goal.currentCalories || 0);
    }
  }, [goal]);

  const progress = goal ? (currentCalories / goal.targetCalories) * 100 : 0;

  const calculateRemainingDays = () => {
    if (goal && goal.targetDate) {
      const targetDate = new Date(goal.targetDate);
      const today = new Date();
      const timeDiff = targetDate.getTime() - today.getTime();
      const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
      return daysDiff >= 0 ? daysDiff : 0;
    }
    return 0;
  };

  const remainingDays = calculateRemainingDays();

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (goal) {
      onUpdateGoal(values);
    } else {
      onAddGoal(values);
    }
    form.reset();
  };

  return (
    <Card className="w-[350px] p-5 shadow-lg">
      <CardHeader className="text-center">
        <CardTitle className="text-xl font-bold">Calorie Goal</CardTitle>
        <CardDescription className="text-gray-500">
          {goal
            ? "Track your calorie-burning goal."
            : "Set and track your calorie-burning goal."}
        </CardDescription>
      </CardHeader>
      <CardContent className="text-center">
        {goal ? (
          <div>
            <p className="text-lg font-semibold">{goal.description}</p>
            <Progress
              value={progress}
              className="w-full h-4 rounded-full bg-gradient-to-r from-green-400 to-yellow-400"
            />
            <p className="mt-2 text-sm">
              {currentCalories} / {goal.targetCalories} calories burned
            </p>
            <p className="mt-2 text-sm">
              {remainingDays} {remainingDays === 1 ? "day" : "days"} remaining
            </p>
            {goal.achievements?.length ? (
              <div className="mt-6">
                <p className="text-sm font-bold">Achievement Badges:</p>
                <div className="flex justify-center gap-2 mt-2">
                  {goal.achievements.map((achievement) => (
                    <div
                      key={achievement.id}
                      className="bg-yellow-400 p-2 rounded-full flex items-center"
                    >
                      🏅 {achievement.title}
                    </div>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        ) : (
          <p className="my-4 text-gray-500">
            No goal set. Set a new goal below.
          </p>
        )}
        <div className="mt-4 flex justify-end">
          <Dialog>
            <DialogTrigger>
              <Button>{goal ? "Edit" : "Add"} Goal</Button>
            </DialogTrigger>
            <DialogContent className="w-96">
              <DialogHeader>
                <DialogTitle>
                  {goal ? "Edit" : "Add"} Your Calorie Goal
                </DialogTitle>
                <DialogDescription>
                  {goal
                    ? "Update the details of your calorie-burning goal."
                    : "Fill in the details below to set a new calorie-burning goal."}
                </DialogDescription>
              </DialogHeader>
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
                          <Input
                            placeholder="E.g., Burn 500 calories in a week"
                            {...field}
                          />
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
                  <div className="flex justify-between">
                    <Button type="submit">Save Goal</Button>
                  </div>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </div>
      </CardContent>
    </Card>
  );
};

export default Goal;
