import { useState, useEffect } from "react";
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

type Workout = {
  type: string;
  baseCaloriesPerHour: number;
};

const workouts: Workout[] = [
  { type: "Running", baseCaloriesPerHour: 700 },
  { type: "Walking", baseCaloriesPerHour: 275 },
  { type: "Cycling", baseCaloriesPerHour: 550 },
  { type: "Jumping Rope", baseCaloriesPerHour: 800 },
  { type: "Swimming", baseCaloriesPerHour: 500 },
  { type: "HIIT", baseCaloriesPerHour: 750 },
  { type: "Rowing", baseCaloriesPerHour: 500 },
  { type: "Stair Climbing", baseCaloriesPerHour: 600 },
  { type: "Elliptical Trainer", baseCaloriesPerHour: 600 },
  { type: "Strength Training", baseCaloriesPerHour: 400 },
];

const FormSchema = z.object({
  type: z.string().min(2, { message: "Workout type cannot be empty" }),
  speed: z
    .string()
    .max(2, { message: "Speed cannot be more than 99" })
    .optional(),
  effort: z.string().optional(),
});

const AddWorkout = () => {
  const [selectedWorkout, setSelectedWorkout] = useState<Workout | null>(null);
  const [calories, setCalories] = useState("0.00");

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      type: "",
      speed: "0",
      effort: "low",
    },
  });

  const handleWorkoutChange = (value: string) => {
    const workout = workouts.find((workout) => workout.type === value) || null;
    setSelectedWorkout(workout);
    form.setValue("type", value);
    form.clearErrors("type");
    setCalories("0.00");
  };

  const calculateCalories = (
    speed: string | undefined,
    effort: string | undefined,
    baseCalories: number,
  ) => {
    let caloriesBurned = baseCalories;
    if (speed) {
      const speedNum = parseFloat(speed);
      if (!isNaN(speedNum)) {
        caloriesBurned = baseCalories * (speedNum / 10);
      }
    }
    if (effort) {
      const effortNum =
        effort === "low" ? 0.8 : effort === "moderate" ? 1.0 : 1.2;
      caloriesBurned = baseCalories * effortNum;
    }
    setCalories(caloriesBurned.toFixed(2));
  };

  const handleInputChange = () => {
    const { speed, effort } = form.getValues();
    if (selectedWorkout) {
      calculateCalories(speed, effort, selectedWorkout.baseCaloriesPerHour);
    }
  };

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    console.log(data); // Replace this with your actual submit logic
  };

  const handleCancelBtn = () => {
    setSelectedWorkout(null);
    setCalories("0.00");
    form.reset(); // Reset form fields to default values
  };

  useEffect(() => {
    handleInputChange();
  }, [form.watch("speed"), form.watch("effort"), selectedWorkout]);

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
                              id="speed"
                              placeholder="Speed"
                              {...field}
                              onChange={(e) => {
                                field.onChange(e);
                                handleInputChange();
                              }}
                            />
                          </FormControl>
                          <FormDescription>
                            Optional: Enter the speed to refine calorie
                            estimates.
                          </FormDescription>
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
                        placeholder="Calories burned"
                        value={calories ? `${calories} calories` : ""}
                        readOnly
                      />
                    </div>
                  </>
                )}
              </div>
              <CardFooter className="flex justify-between mt-4">
                <Button variant="outline" type="button" onClick={handleCancelBtn}>
                  Cancel
                </Button>
                <Button type="submit">Save Workout</Button>
              </CardFooter>
            </form>
          </Form>
        </CardContent>
      </Card>
    </>
  );
};

export default AddWorkout;
