import { useState, useEffect, useCallback } from "react";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Loader from "@/components/ui/loader";
import { createWorkout } from "@/api/workout/workout";
import { formattedDate, Workout, workouts } from "@/lib/utils";

type onAddWorkType = {
  onAddWork: () => void;
};

const FormSchema = z.object({
  type: z
    .string()
    .min(1, { message: "Please select a workout type to proceed." }),
  speed: z
    .number()
    .min(0)
    .max(99, { message: "Speed cannot be more than 99" })
    .optional(),
  effort: z.string().optional(),
  duration: z
    .number()
    .min(1, { message: "Duration must be at least 1 minute" })
    .max(999, { message: "Duration cannot be more than 999 minutes" })
    .optional(),
  date: z.string().optional(),
});

const AddWorkout = ({ onAddWork }: onAddWorkType) => {
  const [selectedWorkout, setSelectedWorkout] = useState<Workout | null>(null);
  const [calories, setCalories] = useState(0.0);
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      type: "",
      speed: undefined,
      effort: "low",
      duration: undefined,
    },
  });

  const handleWorkoutChange = (value: string) => {
    const workout = workouts.find((workout) => workout.type === value) || null;
    setSelectedWorkout(workout);
    form.setValue("type", value);
    form.clearErrors("type");
    setCalories(0.0);
  };

  const calculateCalories = (
    speed: number | undefined,
    effort: string | undefined,
    duration: number | undefined,
    baseCalories: number,
  ) => {
    let caloriesBurned = baseCalories;

    if (speed) {
      if (!isNaN(speed)) {
        caloriesBurned = baseCalories * (speed / 10);
      }
    }

    if (effort) {
      const effortNum =
        effort === "low" ? 0.8 : effort === "moderate" ? 1.0 : 1.2;
      caloriesBurned = baseCalories * effortNum;
    }

    if (duration) {
      caloriesBurned = (caloriesBurned / 60) * duration;
    }

    setCalories(Number(Math.floor(caloriesBurned)));
  };

  const handleInputChange = useCallback(() => {
    const { speed, effort, duration } = form.getValues();
    if (selectedWorkout) {
      calculateCalories(
        speed,
        effort,
        duration,
        selectedWorkout.baseCaloriesPerHour,
      );
    }
  }, [selectedWorkout, form]);

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    setLoading(true);

    try {
      await createWorkout({ ...data, date: formattedDate, calories: calories });
      onAddWork()
    } finally {
      setLoading(false);
      setSelectedWorkout(null);
      setCalories(0.0);
      form.reset();
    }
  };

  const handleCancelBtn = () => {
    setSelectedWorkout(null);
    setCalories(0.0);
    form.reset();
  };

  useEffect(() => {
    handleInputChange();
  }, [handleInputChange, selectedWorkout]);

  return (
    <>
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Add workout</CardTitle>
          <CardDescription>Add your new workout details below.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="grid w-full items-center gap-4">
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem className="flex flex-col space-y-1.5">
                      <FormLabel htmlFor="workoutType">Workout Type</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={(value) => handleWorkoutChange(value)}
                          value={field.value}
                          disabled={loading}
                        >
                          <SelectTrigger id="workoutType">
                            <SelectValue placeholder="Select a workout" />
                          </SelectTrigger>
                          <SelectContent position="popper">
                            {workouts.map((workout) => (
                              <SelectItem
                                key={workout.type}
                                value={workout.type}
                              >
                                {workout.type}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {selectedWorkout && (
                  <>
                    <FormField
                      control={form.control}
                      name="speed"
                      render={({ field }) => (
                        <FormItem className="flex flex-col space-y-1.5">
                          <FormLabel htmlFor="speed">Speed (km/h)</FormLabel>
                          <FormControl>
                            <Input
                              disabled={loading}
                              type="number"
                              id="speed"
                              min={0}
                              max={99}
                              placeholder="Speed"
                              {...field}
                              onChange={(e) => {
                                field.onChange(Number(e.target.value));
                                handleInputChange();
                              }}
                            />
                          </FormControl>
                          <FormMessage />
                          <FormDescription>
                            Optional: Enter the speed to refine calorie
                            estimates.
                          </FormDescription>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="duration"
                      render={({ field }) => (
                        <FormItem className="flex flex-col space-y-1.5">
                          <FormLabel htmlFor="duration">
                            Duration (min)
                          </FormLabel>
                          <FormControl>
                            <Input
                              disabled={loading}
                              type="number"
                              id="duration"
                              placeholder="Duration"
                              {...field}
                              onChange={(e) => {
                                field.onChange(Number(e.target.value));
                                handleInputChange();
                              }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="effort"
                      render={({ field }) => (
                        <FormItem className="flex flex-col space-y-1.5">
                          <FormLabel htmlFor="effort">
                            Effort (if applicable)
                          </FormLabel>
                          <FormControl>
                            <Select
                              value={field.value || ""}
                              disabled={loading}
                              onValueChange={(value) => {
                                field.onChange(value);
                                handleInputChange();
                              }}
                            >
                              <SelectTrigger id="effort">
                                <SelectValue placeholder="Select effort level" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="low">Low</SelectItem>
                                <SelectItem value="moderate">
                                  Moderate
                                </SelectItem>
                                <SelectItem value="high">High</SelectItem>
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormDescription>
                            Optional: Select the effort level to adjust calorie
                            estimates.
                          </FormDescription>
                        </FormItem>
                      )}
                    />
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="calories">Calories Burned</Label>
                      <Input
                        id="calories"
                        disabled={loading}
                        placeholder="Calories burned"
                        value={calories ? `${calories} calories` : ""}
                        readOnly
                      />
                    </div>
                  </>
                )}
              </div>
              <CardFooter className="flex justify-between mt-4">
                <Button
                  variant="outline"
                  type="button"
                  onClick={handleCancelBtn}
                  disabled={loading}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={loading}>
                  {loading ? <Loader /> : "Save Workout"}
                </Button>
              </CardFooter>
            </form>
          </Form>
        </CardContent>
      </Card>
    </>
  );
};

export default AddWorkout;
