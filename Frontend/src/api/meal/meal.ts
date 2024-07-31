import { toast } from "@/components/ui/use-toast";
import { CombinedFoodItem } from "@/types/types";
import { resolveTxt } from "dns";

export const addMeal = async (data: CombinedFoodItem) => {
  try {
    const response = await fetch("http://localhost:5000/meal/addMeal", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = response.json();
    if (response.ok) {
      toast({
        title: "Meal added",
        description: "Your meal has been successfully added.",
        variant: "default",
      });
    } else {
      toast({
        title: "Failed to add meal",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
      return null;
    }
    console.log(result);
  } catch (error) {
    console.log(error);
  }
};

export const getMeal = async () => {
  try {
    const response = await fetch("http://localhost:5000/meal/", {
      method: "GET",
      credentials: 'include'
    });

    const result = await response.json();

    if (response.ok) {
      return result.data;
    } else {
      toast({
        title: "Failed to data",
        description: "Failed to fetch meal data. Please try again",
        variant: "destructive",
      });
    }
  } catch (error) {
    console.log(error);
  }
};
