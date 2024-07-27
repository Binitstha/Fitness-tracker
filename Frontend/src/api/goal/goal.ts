import { toast } from "@/components/ui/use-toast";
import { goalType } from "@/types/types";

export const getWorkouts = async (data: goalType) => {
  try {
    const response = await fetch("http://localhost:5000/goal/addGoal", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(data),
    });
    const result = await response.json();

    return result.data;
  } catch (error) {
    console.error(error);
    toast({
      title: "Failed to fetch workouts",
      description: "An unexpected error occurred. Please try again.",
      variant: "destructive",
    });
  }
};
