import { workoutType } from "@/types/types";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useState, useCallback } from "react";
import { updateWorkout } from "@/api/workout/workout";
import { formattedDate, workouts } from "@/lib/utils";

type Workout = {
  type: string;
  baseCaloriesPerHour: number;
};

export const UpdateWorkout = ({
  workout,
  onWorkoutUpdate,
}: {
  workout: workoutType;
  onWorkoutUpdate: () => void;
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [calories, setCalories] = useState<number>(workout.calories);

  const FormSchema = z.object({
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

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      speed: workout.speed || undefined,
      effort: workout.effort,
      duration: workout.duration || undefined,
    },
  });

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
    const workoutType = workouts.find((w) => w.type === workout.type);
    if (workoutType) {
      calculateCalories(
        speed,
        effort,
        duration,
        workoutType.baseCaloriesPerHour,
      );
    }
  }, [form, workout.type]);

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    setLoading(true);
    try {
      await updateWorkout(workout.id, {
        ...data,
        calories,
        date: formattedDate,
      });
      onWorkoutUpdate();
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Update</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Workout</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          Modify the speed, duration, or effort to recalculate the calories
          burned.
        </DialogDescription>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid w-full items-center gap-4">
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
                      Optional: Enter the speed to refine calorie estimates.
                    </FormDescription>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="duration"
                render={({ field }) => (
                  <FormItem className="flex flex-col space-y-1.5">
                    <FormLabel htmlFor="duration">Duration (min)</FormLabel>
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
                          <SelectItem value="moderate">Moderate</SelectItem>
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
            </div>
            <DialogFooter className="mt-4">
              <DialogClose asChild>
                <Button type="button" variant="secondary">
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit" disabled={loading}>
                Update
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
