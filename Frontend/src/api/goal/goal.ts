import { toast } from "@/components/ui/use-toast";
import { goalType } from "@/types/types";

export const addGoal = async (data: Omit<goalType, "id" | "achieved">) => {
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

    console.log(result);
    if (response.ok) {
      toast({
        title: "Goal added",
        description: "Your goal has been successfully added.",
        variant: "default",
      });
      return result.data;
    } else {
      toast({
        title: "Failed to add goal",
        description:
          result.message || "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    }
    return result;
  } catch (error) {
    console.error(error);
    toast({
      title: "Failed to add goal",
      description: "An unexpected error occurred. Please try again.",
      variant: "destructive",
    });
  }
};

export const getGoal = async () => {
  try {
    const response = await fetch("http://localhost:5000/goal/goal", {
      method: "GET",
      credentials: "include",
    });
    const result = await response.json();

    console.log(result);
    if (response.ok) {
      return result.data;
    } else {
      throw new Error(result.message || "An unexpected error occurred.");
    }
  } catch (error) {
    console.error(error);
    throw new Error("An unexpected error occurred.");
  }
};
