import { toast } from "@/components/ui/use-toast";

export const createWorkout = async (data: any) => {
  try {
    const response = await fetch("http://localhost:5000/workout/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: 'include',
      body: JSON.stringify(data),
    });
    const result = await response.json();

    if (response.ok) {
      toast({
        title: "Workout created successfully",
        description: result.message,
        variant: "default",
      });
    } else {
      toast({
        title: "Failed to create workout",
        description: result.message,
        variant: "destructive",
      });
    }
  } catch (error) {
    console.error(error);
    toast({
      title: "Failed to create workout",
      description: "An unexpected error occurred. Please try again.",
      variant: "destructive",
    });
  }
};
