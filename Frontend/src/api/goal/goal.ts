import { toast } from "@/components/ui/use-toast";
import { goalType } from "@/types/types";

const Url = process.env.NEXT_PUBLIC_API;

export const addGoal = async (
  data: Omit<goalType, "id" | "achieved" | "userId">,
) => {
  try {
    const response = await fetch(`${Url}goal/addGoal`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(data),
    });
    const result = await response.json();

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
      return null;
    }
  } catch (error) {
    console.error(error);
    toast({
      title: "Failed to add goal",
      description: "An unexpected error occurred. Please try again.",
      variant: "destructive",
    });
    return null;
  }
};

export const getGoal = async () => {
  try {
    const response = await fetch(`${Url}goal/goal`, {
      method: "GET",
      credentials: "include",
    });
    const result = await response.json();

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

export const deleteGoal = async (id: string) => {
  try {
    const response = await fetch(`${Url}goal/${id}`, {
      method: "DELETE",
      credentials: "include",
    });
    if (response.ok) {
      toast({
        title: "Goal deleted",
        description: "Your goal has been successfully deleted.",
        variant: "default",
      });
    } else {
      throw new Error("An unexpected error occurred");
    }
  } catch (error) {
    console.error(error);
    toast({
      title: "Failed to delete goal",
      description: "An unexpected error occurred. Please try again.",
      variant: "destructive",
    });
  }
};

export const updateGoal = async (
  id: string,
  data: Omit<goalType, "id" | "achieved" | "userId">,
) => {
  try {
    const response = await fetch(`${Url}updateGoal/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(data),
    });
    const result = await response.json();

    if (response.ok) {
      toast({
        title: "Goal updated",
        description: "Your goal has been successfully updated.",
        variant: "default",
      });
      return result.data;
    } else {
      toast({
        title: "Failed to update goal",
        description:
          result.message || "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
      return null;
    }
  } catch (error) {
    console.error(error);
    toast({
      title: "Failed to update goal",
      description: "An unexpected error occurred. Please try again.",
      variant: "destructive",
    });
    return null;
  }
};
