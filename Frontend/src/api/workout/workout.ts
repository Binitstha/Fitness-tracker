import { toast } from "@/components/ui/use-toast";

export const createWorkout = async (data: any) => {
  try {
    const response = await fetch("http://localhost:5000/workout/create", {
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

export const getWorkouts = async () => {
  try {
    const response = await fetch("http://localhost:5000/workout/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
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

export const deleteWorkout = async (id: string) => {
  try {
    const response = await fetch(`http://localhost:5000/workout/delete/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const result = await response.json();
    if (response.ok) {
      toast({
        title: "Workout deleted successfully",
        description: result.message,
        variant: "default",
      });
    } else {
      toast({
        title: "Failed to delete workout",
        description: result.message,
        variant: "destructive",
      });
    }
  } catch (error) {
    console.error(error);
    toast({
      title: "Failed to fetch workouts",
      description: "An unexpected error occurred. Please try again.",
      variant: "destructive",
    });
  }
};

export const updateWorkout = async (id: string, data: any) => {
  try {
    const response = await fetch(`http://localhost:5000/workout/update/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(data),
    });
    const result = await response.json();

    console.log(result);
    // if (response.ok) {
    //   toast({
    //     title: "Workout updated successfully",
    //     description: result.message,
    //     variant: "default",
    //   });
    // } else {
    //   toast({
    //     title: "Failed to update workout",
    //     description: result.message,
    //     variant: "destructive",
    //   });
    // }
  } catch (error) {
    console.error(error);
    toast({
      title: "Failed to update workout",
      description: "An unexpected error occurred. Please try again.",
      variant: "destructive",
    });
  }
};